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
$tipo_id = $data['tipo_id'] ?? null;
$pessoa_id = $data['pessoa_id'] ?? null;
$passo_estado_id = $data['passo_estado_id'] ?? null;
$data_validade = $data['data_validade'] ?? null;
$data_emissao = $data['data_emissao'] ?? null;
$saldo = $data['saldo'] ?? 0;

//pequena validação de dados
if (!$tipo_id || !$pessoa_id || !$passo_estado_id || !$data_validade || !$data_emissao) {
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
            echo json_encode([
                "informacao" => "Passe criado com sucesso!"
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
