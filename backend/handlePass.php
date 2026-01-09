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
            $stmt = $pdo->prepare("DELETE FROM MOVIMENTOPASSE WHERE passe_id = :id");
            $stmt->execute(["id" => $idPasse]);

            $stmt = $pdo->prepare("DELETE FROM PASSE WHERE id_passe = :id");
            $stmt->execute(["id" => $idPasse]);

            echo json_encode([
                "success" => true,
                "action" => "apagar"
            ]);
            break;

        case "renovar":
            // renovar +30 dias
            $stmt = $pdo->prepare("
        UPDATE PASSE
        SET data_validade = DATE_ADD(data_validade, INTERVAL 30 DAY)
        WHERE id_passe = :id
    ");
            $stmt->execute(["id" => $idPasse]);

            $stmt = $pdo->prepare("
                INSERT INTO MOVIMENTOPASSE (passe_id, pagamento_tipo_id, data_hora, descricao)
                VALUES (:id, 2, current_timestamp(), 'Recarregamento de saldo')
            ");
            $stmt->execute(["id" => $idPasse]);
            // buscar a nova data_validade
            $stmt2 = $pdo->prepare("
        SELECT data_validade
        FROM PASSE
        WHERE id_passe = :id
    ");
            $stmt2->execute(["id" => $idPasse]);
            $newData = $stmt2->fetch(PDO::FETCH_ASSOC);

            echo json_encode([
                "success" => true,
                "action" => "renovar",
                "nova_Data_Validade" => $newData['data_validade'] ?? null
            ]);
            break;

        case "recarregar":
            // exemplo: incrementar saldo
            $stmt = $pdo->prepare("
                UPDATE PASSE
                SET saldo = saldo + :amount
                WHERE id_passe = :id
            ");
            $stmt->execute(["id" => $idPasse, "amount" => $amount]);

            $stmt = $pdo->prepare("
                INSERT INTO MOVIMENTOPASSE (passe_id, pagamento_tipo_id, data_hora, descricao)
                VALUES (:id, 3, current_timestamp(), 'Recarregamento de saldo')
            ");
            $stmt->execute(["id" => $idPasse]);

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
