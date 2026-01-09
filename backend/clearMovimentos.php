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
$pdo = estabelerConexao();
try {
    $sql = " DELETE FROM MOVIMENTOPASSE 
        WHERE pessoa_id IN (
            SELECT id_pessoa 
            FROM PESSOA 
            WHERE nome = ?
        )";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$username]);

    echo json_encode([
        'success' => true,
        'message' => 'Movimentos limpos com sucesso',
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro na base de dados: ' . $e->getMessage()
    ]);
}
