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

$pdo = estabelerConexao();

$stmt = $pdo->prepare(
    "INSERT INTO PASSE 
    (tipo_id,pessoa_id,passe_estado_id,data_validade,data_emissao,saldo) 
    VALUES(?,?,?,?,?,?)"
);
$stmt->execute([$tipo_id, $pessoa_id, $passo_estado_id, $data_validade, $data_emissao, $saldo]);
$user = $stmt->fetch();
if ($passe) {
    json_encode([
        "informacao" => "Passe criado com sucesso!"
    ]);
} else {
    json_encode(["informacao" => "Ocorreu algum erro na criação do passe!"]);
}
