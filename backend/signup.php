<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json"); // <--- garante JSON

include "DBConnection.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$email = $data["email"] ?? null;
$pass = $data["pass"] ?? null;
$nome = $data["nome"] ?? null;
$NIF = $data["nif"] ?? null;

// validação básica
if (!$email || !$pass || !$nome || !$NIF) {
    echo json_encode(["result" => "dados insuficientes"]);
    exit;
}

try {
    $pdo = estabelerConexao();

    $stmt = $pdo->prepare(
        "INSERT INTO PESSOA (nome, email, palavra_passe, nif) VALUES (?, ?, ?, ?)"
    );

    $success = $stmt->execute([$nome, $email, $pass, $NIF]);

    if ($success) {
        echo json_encode(["result" => "Registo efetuado com sucesso"]);
    } else {
        $errorInfo = $stmt->errorInfo();
        echo json_encode([
            "result" => "Erro ao registar utilizador",
            "error" => $errorInfo
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "result" => "Erro de conexão",
        "error" => $e->getMessage()
    ]);
}
