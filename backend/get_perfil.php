<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "DBConnection.php";

$pdo = estabelerConexao();

// get nif -> (get_perfil.php?nif=123456789)
$nif = $_GET['nif'] ?? null;

if (!$nif) {
    echo json_encode(["status" => "error", "message" => "NIF em falta"]);
    exit;
}

try {
    // Vai à BD buscar os dados da Pessoa e junta a Morada (caso ela exista)
    $sql = "SELECT p.*, m.rua, m.concelho, m.codigo_postal, m.pais_residente, 
                td.validade as data_validade
            FROM PESSOA p 
            LEFT JOIN MORADA m ON p.morada_id = m.id_morada 
            LEFT JOIN TIPODOCUMENTO td ON p.documento_id = td.id_documento 
            WHERE p.nif = :nif";
            
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':nif' => $nif]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(["status" => "success", "data" => $user]);
    } else {
        echo json_encode(["status" => "error", "message" => "Utilizador não encontrado"]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>