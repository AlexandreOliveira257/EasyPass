<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

include "DBConnection.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$email = $data["email"] ?? null;
$pass = $data["pass"] ?? null;

if (!$email || !$pass) {
    echo json_encode(["result" => "dados insuficientes"]);
    exit;
}

$pdo = estabelerConexao();

$stmt = $pdo->prepare("SELECT * FROM PESSOA WHERE email = ? AND palavra_passe = ?");
$stmt->execute([$email, $pass]);
$user = $stmt->fetch();

if ($user) {
    // busca pedidos
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
    echo json_encode([
        "result" => "Login com sucesso!",
        "nome" => $user['nome'],
        "pedidos" => $userPedidos,
        "movimentos" => $userMovimentos
    ]);
} else {
    echo json_encode(["result" => "Email ou palavra-passe incorretos!"]);
}
