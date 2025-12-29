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

$stmt = $pdo->prepare("SELECT id_pessoa, nome FROM PESSOA WHERE email = ? AND palavra_passe = ?");
$stmt->execute([$email, $pass]);
$user = $stmt->fetch();

if ($user) {
    // busca passes
    $stmt3 = $pdo->prepare("
        SELECT id_passe, data_validade, data_emissao, saldo, preco, ESTADO_PASSE.estado_passe_descricao, TIPOPASSE.nome_tipo
        FROM PASSE 
        INNER JOIN PESSOA ON PASSE.pessoa_id = PESSOA.id_pessoa
        INNER JOIN ESTADO_PASSE ON PASSE.passe_estado_id = ESTADO_PASSE.id_estado_passe
        INNER JOIN TIPOPASSE ON PASSE.tipo_id = TIPOPASSE.id_tipo
        WHERE PESSOA.email = ?
    ");
    $stmt3->execute([$email]);
    $userPasses = $stmt3->fetchAll(PDO::FETCH_ASSOC);
    // busca notifications
    $stmt4 = $pdo->prepare("
        SELECT titulo, mensagem, data_envio, lida FROM NOTIFICACAO 
        INNER JOIN PESSOA ON NOTIFICACAO.pessoa_id = PESSOA.id_pessoa
        WHERE PESSOA.email = ?
    ");
    $stmt4->execute([$email]);
    $userNotifications = $stmt4->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
        "result" => "Login com sucesso!",
        "nome" => $user['nome'],
        "id_pessoa" => $user['id_pessoa'],
        "passes" => $userPasses,
        "notifications" => $userNotifications
    ]);
} else {
    echo json_encode(["result" => "Email ou palavra-passe incorretos!"]);
}
