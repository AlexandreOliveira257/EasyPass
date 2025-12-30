<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

include "DBConnection.php";

// Define duração da session para 1 dia (86400 segundos)
session_set_cookie_params(86400);
ini_set('session.gc_maxlifetime', 86400);

session_start();

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$email = $data["email"] ?? null;
$pass = $data["pass"] ?? null;

if (!$email || !$pass) {
    echo json_encode(["result" => "dados insuficientes"]);
    exit;
}

$pdo = estabelerConexao();

$stmt = $pdo->prepare("SELECT id_pessoa, nome, nif, email FROM PESSOA WHERE email = ? AND palavra_passe = ?");
$stmt->execute([$email, $pass]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {

    $nif_final = $user['nif'] ?? $user['NIF'] ?? "ERRO_COLUNA_NAO_EXISTE";

    // Gravar dados na session
    $_SESSION['id_pessoa'] = $user['id_pessoa'];
    $_SESSION['nif'] = $nif_final;
    $_SESSION['nome'] = $user['nome'];

    $nif_limpo = $user['nif'] ?? $user['NIF'] ?? "ERRO_COLUNA_NAO_EXISTE";

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
        "DEBUG_VER" => "3.0_FINAL",
        "result" => "Login com sucesso!",
        "status" => "success",
        "nome" => $user['nome'],
        "id_pessoa" => $user['id_pessoa'],
        "nif" => (string)$nif_final,
        "email" => $email,
        "passes" => $userPasses,
        "notifications" => $userNotifications
    ]);
} else {
    echo json_encode(["result" => "Email ou palavra-passe incorretos!"]);
}

