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

$pdo = estabelerConexao();

$email = $data['email'] ?? "";

try {
    $stmt1 = $pdo->prepare("
        SELECT mensagem, ESTADO_PEDIDO.estado_pedido_descricao, data_emissao
        FROM PEDIDO 
        INNER JOIN PESSOA ON PESSOA.id_pessoa = PEDIDO.pessoa_id 
        INNER JOIN ESTADO_PEDIDO on PEDIDO.pedido_estado_id = ESTADO_PEDIDO.id_estado_pedido
        WHERE PESSOA.email = ?
    ");
    $stmt1->execute([$email]);
    $userPedidos = $stmt1->fetchAll(PDO::FETCH_ASSOC);
    // busca movimentos
    $stmt2 = $pdo->prepare("
        SELECT data_hora, valor, descricao, saldo_anterior, saldo_posterior, TIPOPASSE.nome_tipo
        FROM MOVIMENTOPASSE 
        INNER JOIN PASSE ON MOVIMENTOPASSE.passe_id = PASSE.id_passe
        INNER JOIN PESSOA ON PASSE.pessoa_id = PESSOA.id_pessoa
        INNER JOIN TIPOPASSE ON PASSE.tipo_id = TIPOPASSE.id_tipo
        WHERE PESSOA.email = ?
    ");
    $stmt2->execute([$email]);
    $userMovimentos = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    if ($userPedidos && $userMovimentos) {
        echo json_encode([
            "informacao" => "Pedidos e movimentos obtidos com sucesso!"
        ]);
    } else {
        echo json_encode([
            "informacao" => "Erro na obtenção dos pedidos e movimentos deste utilizador"
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "erro" => $e->getMessage()
    ]);
}
