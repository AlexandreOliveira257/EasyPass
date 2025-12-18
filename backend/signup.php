<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
include "DBConnection.php";
$input = file_get_contents("php://input");
$data = json_decode($input, true);

$email = $data["email"] ?? null;
$pass = $data["pass"] ?? null;
$nome = $data["nome"] ?? null;
$NIF = $data["nif"] ?? null;

if (!$email && !$pass) {
    echo json_encode(["result" => "dados insuficientes"]);
    exit;
};

$pdo = estabelerConexao();

$stmt = $pdo->prepare("INSERT INTO PESSOA (nome,email,palavra_passe,nif) values(?,?,?,?)");
$stmt->execute([$nome, $email, $pass, $NIF]);
$user = $stmt->fetch();

if ($user) {
    $response = ["result" => "Utilizador adicionado com sucesso!", "nome" => $user['nome']];
} else {
    $response = ["result" => "Ocorreu um erro ao adicionar novo utilizador!"];
}

echo json_encode($response);
