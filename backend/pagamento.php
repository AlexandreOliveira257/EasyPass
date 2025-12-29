<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require "DBConnection.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["erro" => "JSON inválido"]);
    exit;
}

$pdo = estabelerConexao();

// extrair dados do JSON
$id = $data['idpessoa'] ?? "";
$tipo_id = $data['tipo_id'] ?? null;
$pessoa_id = $data['pessoa_id'] ?? null;
$passo_estado_id = $data['passo_estado_id'] ?? null;
$data_validade = $data['data_validade'] ?? null;
$data_emissao = $data['data_emissao'] ?? null;
$saldo = $data['saldo'] ?? 0;

//pequena validação de dados
if (!isset($tipo_id, $pessoa_id, $passo_estado_id, $data_validade, $data_emissao)) {
    echo json_encode(["erro" => "Dados obrigatórios em falta"]);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "INSERT INTO PASSE 
        (tipo_id, pessoa_id, passe_estado_id, data_validade, data_emissao, saldo) 
        VALUES (?, ?, ?, ?, ?, ?)"
    );

    $ok = $stmt->execute([
        $tipo_id,
        $pessoa_id,
        $passo_estado_id,
        $data_validade,
        $data_emissao,
        $saldo
    ]);

    if ($ok) {
        $stmt = $pdo->prepare(
            "INSERT INTO NOTIFICACAO 
        (pessoa_id, titulo, mensagem, data_envio, lida) 
        VALUES (?, ?, ?, ?, ?)"
        );
        $okNotification = $stmt->execute([
            $pessoa_id,
            "Pagamento confirmado",
            "O pagamento foi processado com sucesso!",
            $data_emissao,
            0
        ]);
        if ($okNotification) {
            $stmt1 = $pdo->prepare(
                "SELECT id_passe, data_validade, data_emissao, saldo, preco, ESTADO_PASSE.estado_passe_descricao, TIPOPASSE.nome_tipo
                FROM PASSE 
                INNER JOIN PESSOA ON PASSE.pessoa_id = PESSOA.id_pessoa
                INNER JOIN ESTADO_PASSE ON PASSE.passe_estado_id = ESTADO_PASSE.id_estado_passe
                INNER JOIN TIPOPASSE ON PASSE.tipo_id = TIPOPASSE.id_tipo
                WHERE PESSOA.id_pessoa = ?"
            );
            $stmt1->execute([$id]);
            $passesAtualizado = $stmt1->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                "informacao" => "Passe criado com sucesso!",
                "passesAtualizado" => $passesAtualizado
            ]);
        }
    } else {
        echo json_encode([
            "informacao" => "Erro ao criar o passe"
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "erro" => $e->getMessage()
    ]);
}
