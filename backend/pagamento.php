<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include "DBConnection.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);
$tipo_id = $data['$tipo_id'] ?? null;
$pessoa_id = $data['$pessoa_id'] ?? null;
$passo_estado_id = $data['$passo_estado_id'] ?? null;
$data_validade = $data['$data_validade'] ?? null;
$data_emissao = $data['$data_emissao'] ?? null;
$saldo = $data['$saldo'] ?? 0;
$pdo = estabelerConexao();

$stmt = $pdo->prepare(
    "INSERT INTO PASSE 
    (tipo_id,pessoa_id,passe_estado_id,data_validade,data_emissao,saldo) 
    VALUES(?,?,?,?,?,?)"
);
$stmt->execute([$tipo_id, $pessoa_id, $passo_estado_id, $data_validade, $data_emissao, $saldo]);
$user = $stmt->fetch();
if ($passe) {
    echo json_encode([
        "informacao" => "Passe criado com sucesso!"
    ]);
} else {
    echo json_encode(["informacao" => "Ocorreu algum erro na criação do passe!"]);
}
