<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
$input = file_get_contents("php://input");
$data = json_decode($input, true);

$email = $data["email"] ?? null;
$pass = $data["pass"] ?? null;

if (!$email || !$pass) {
    echo json_encode(["result" => "dados insuficientes"]);
    exit;
}

function estabelerConexao()
{
    $host = 'ftp.antrob.eu';
    $db   = 'u506280443_migaleDB';
    $user = 'u506280443_migaledbUser';
    $pass = '+9w6?HZu';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    return new PDO($dsn, $user, $pass, $options);
}

try {
    $pdo = estabelerConexao();
    $stmt = $pdo->prepare("SELECT * FROM pessoa WHERE email = ? AND palavra_passe = ?");
    $stmt->execute([$email, $pass]);
    $user = $stmt->fetch();

    if ($user) {
        $response = ["result" => "Login com sucesso!"];
    } else {
        $response = ["result" => "Ocorreu um erro no login!"];
    }
} catch (Exception $e) {
    $response = ["result" => "Erro no servidor", "error" => $e->getMessage()];
}

echo json_encode($response);
