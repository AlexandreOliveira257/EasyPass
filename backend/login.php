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
        SELECT mensagem 
        FROM PEDIDO 
        INNER JOIN PESSOA ON PESSOA.id_pessoa = PEDIDO.pessoa_id 
        WHERE PESSOA.email = ?
    ");
    $stmt1->execute([$email]);
    $userPedidos = $stmt1->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "result" => "Login com sucesso!",
        "nome" => $user['nome'],
        "pedidos" => $userPedidos
    ]);
} else {
    echo json_encode(["result" => "Email ou palavra-passe incorretos!"]);
}
