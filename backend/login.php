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
    $response = ["result" => "Login com sucesso!", "nome" => $user['nome']];
} else {
    $response = ["result" => "Ocorreu um erro no login!"];
}

echo json_encode($response);
