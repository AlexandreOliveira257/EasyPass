<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include "DBConnection.php";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Apenas permitir método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido'
    ]);
    exit();
}

// Receber dados JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validar username
if (!isset($data['username']) || empty($data['username'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Username não fornecido'
    ]);
    exit();
}

$username = $data['username'];

try {
    $sql = "DELETE FROM NOTIFICACAO WHERE PESSOA.nome = ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$username]);

    echo json_encode([
        'success' => true,
        'message' => 'Notificações limpas com sucesso',
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro na base de dados: ' . $e->getMessage()
    ]);
}
