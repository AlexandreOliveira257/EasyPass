<?php
function estabelerConexao()
{
    $host = 'localhost';
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
