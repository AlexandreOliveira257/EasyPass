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

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["erro" => "JSON inválido"]);
    exit;
}

$pdo = estabelerConexao();

// dados vindos do frontend
$tipo_id = $data['tipo_id'] ?? null;
$id_pessoa = $data['id_pessoa'] ?? null;
$passo_estado_id = $data['passo_estado_id'] ?? null;
$saldo = $data['saldo'] ?? 0;

// validação mínima
if (!isset($tipo_id, $id_pessoa, $passo_estado_id)) {
    echo json_encode(["erro" => "Dados obrigatórios em falta"]);
    exit;
}

try {
    // PASSE → datas calculadas no SQL
    $stmt = $pdo->prepare(
        "INSERT INTO PASSE 
        (tipo_id, pessoa_id, passe_estado_id, data_emissao, data_validade, saldo) 
        VALUES (?, ?, ?, CURRENT_DATE, CURRENT_DATE + INTERVAL 30 DAY, ?)"
    );

    $stmt->execute([
        $tipo_id,
        $id_pessoa,
        $passo_estado_id,
        $saldo
    ]);

    // NOTIFICACAO → data_envio no SQL
    $stmt = $pdo->prepare(
        "INSERT INTO NOTIFICACAO 
        (pessoa_id, titulo, mensagem, data_envio, lida) 
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)"
    );

    $stmt->execute([
        $id_pessoa,
        "Pagamento confirmado",
        "O pagamento foi processado com sucesso!",
        0
    ]);

    // buscar passes atualizados
    $stmt = $pdo->prepare(
        "SELECT id_passe, data_validade, data_emissao, saldo, preco,
                ESTADO_PASSE.estado_passe_descricao,
                TIPOPASSE.nome_tipo
        FROM PASSE
        INNER JOIN PESSOA ON PASSE.pessoa_id = PESSOA.id_pessoa
        INNER JOIN ESTADO_PASSE ON PASSE.passe_estado_id = ESTADO_PASSE.id_estado_passe
        INNER JOIN TIPOPASSE ON PASSE.tipo_id = TIPOPASSE.id_tipo
        WHERE PESSOA.id_pessoa = ?"
    );

    $stmt->execute([$id_pessoa]);
    $passesAtualizado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "informacao" => "Passe criado com sucesso!",
        "passesAtualizado" => $passesAtualizado
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "erro" => $e->getMessage()
    ]);
}
