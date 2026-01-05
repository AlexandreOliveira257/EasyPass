<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include "DBConnection.php";

$pdo = estabelerConexao();

$input = json_decode(file_get_contents("php://input"), true);

$idPasse = $input['idPasse'] ?? null;
$action  = $input['action'] ?? null;
$amount = $input['amount'] ?? null;
if (!$idPasse || !$action) {
    echo json_encode([
        "success" => false,
        "message" => "Parâmetros inválidos"
    ]);
    exit;
}
try {
    switch ($action) {

        case "apagar":
            $stmt = $pdo->prepare("DELETE FROM PASSE WHERE id_passe = :id");
            $stmt->execute(["id" => $idPasse]);

            echo json_encode([
                "success" => true,
                "action" => "apagar"
            ]);
            break;

        case "renovar":
            // exemplo: renovar +30 dias
            $stmt = $pdo->prepare("
                UPDATE PASSE
                SET data_validade = DATE_ADD(data_validade, INTERVAL 30 DAY)
                WHERE id_passe = :id
            ");
            $stmt->execute(["id" => $idPasse]);

            echo json_encode([
                "success" => true,
                "action" => "renovar"
            ]);
            break;

        case "recarregar":
            // exemplo: incrementar saldo
            $stmt = $pdo->prepare("
                UPDATE passes
                SET saldo = saldo + :amount
                WHERE id_passe = :id
            ");
            $stmt->execute(["id" => $idPasse, "amount" => $amount]);

            echo json_encode([
                "success" => true,
                "action" => "recarregar"
            ]);
            break;

        default:
            echo json_encode([
                "success" => false,
                "message" => "Ação inválida"
            ]);
    } //switch

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erro no servidor",
        "error" => $e->getMessage()
    ]);
} //try-catch
