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

$id = $data['id'] ?? "";
$stmt = $pdo->prepare("SELECT id_pessoa, nome FROM PESSOA WHERE id_pessoa = ?");
$stmt->execute([$id]);
$user = $stmt->fetch();

if ($user) {
    try {
        $stmt1 = $pdo->prepare("
        SELECT mensagem, pedido_estado_id, data_emissao
        FROM PEDIDO
        WHERE pessoa_id = ?
    ");
        $stmt1->execute([$id]);
        $userPedidos = $stmt1->fetchAll(PDO::FETCH_ASSOC);
        // busca movimentos
        $stmt2 = $pdo->prepare("
        SELECT data_hora, valor, descricao, saldo_anterior, saldo_posterior, TIPOPASSE.nome_tipo
        FROM MOVIMENTOPASSE 
        INNER JOIN PASSE ON MOVIMENTOPASSE.passe_id = PASSE.id_passe
        INNER JOIN PESSOA ON PASSE.pessoa_id = PESSOA.id_pessoa
        INNER JOIN TIPOPASSE ON PASSE.tipo_id = TIPOPASSE.id_tipo
        WHERE PESSOA.id_pessoa = ?
    ");
        $stmt2->execute([$id]);
        $userMovimentos = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        $stmt4 = $pdo->prepare("
        SELECT titulo, mensagem, data_envio, lida FROM NOTIFICACAO 
        INNER JOIN PESSOA ON NOTIFICACAO.pessoa_id = PESSOA.id_pessoa
        WHERE PESSOA.id_pessoa = ?
    ");
        $stmt4->execute([$id]);
        $userNotifications = $stmt4->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([
            "informacao" => "Pedidos, Movimentos e notificações obtidos com sucesso!",
            "pedidos" => $userPedidos,
            "movimentos" => $userMovimentos,
            "notifications" => $userNotifications
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "erro" => $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        "informacao" => "Utilizador não encontrado"
    ]);
}
