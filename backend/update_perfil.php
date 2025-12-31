<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Se o pedido for OPTIONS (preflight), paramos aqui
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

include "DBConnection.php";

try {
    $pdo = estabelerConexao();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $dados = json_decode(file_get_contents("php://input"), true);

        if ($dados) {
            $pdo->beginTransaction();

            // verificar se o user já tem um morada_id associado
            $stmtCheck = $pdo->prepare("SELECT morada_id FROM PESSOA WHERE nif = :nif");
            $stmtCheck->execute([':nif' => $dados['nif']]);
            $pessoaAtual = $stmtCheck->fetch();
            $moradaId = $pessoaAtual['morada_id'] ?? null;

            if ($moradaId) {
                // se tiver morada_id, atualizar morada existente
                $sqlM = "UPDATE MORADA SET rua = :rua, 
                                           codigo_postal = :cp, 
                                           concelho = :concelho, 
                                           pais_residente = :pais 
                                           WHERE 
                                           id_morada = :id";
                $stmtM = $pdo->prepare($sqlM);
                $stmtM->execute([
                    ':rua' => $dados['morada'],
                    ':cp'  => $dados['codigoPostal'],
                    ':concelho' => $dados['localidade'],
                    ':pais' => $dados['paisResidencia'],
                    ':id' => $moradaId
                ]);
            } else {
                // se nao tiver, inserir nova morada e guardar ID
                $sqlM = "INSERT INTO MORADA (rua, codigo_postal, concelho, pais_residente) 
                         VALUES (:rua, :cp, :concelho, :pais)";
                $stmtM = $pdo->prepare($sqlM);
                $stmtM->execute([
                    ':rua' => $dados['morada'],
                    ':cp'  => $dados['codigoPostal'],
                    ':concelho' => $dados['localidade'],
                    ':pais' => $dados['paisResidencia']
                ]);
                $moradaId = $pdo->lastInsertId();
            }

            // Remove espaços e garante que comparamos corretamente
            $genero_recebido = trim($dados['genero']);      
            // Género: 'Masculino' -> 1, 'Feminino' -> 2, 'Outro' -> 3
            switch ($genero_recebido) {
                case 'Masculino' || 'Male':
                    $genId = '1';
                    break;
                case 'Feminino' || 'Female':
                    $genId = '2';
                    break;
                default:
                    $genId = '3';
            }

            // Tipo Documento Identificação: 'Cartão Cidadão' -> 1, 'Carta Condução' -> 2
            $tipoDocumento = $dados['tipoDocumentoIdentificacao']; // 'CC' ou 'CARTA'
            $idDocFinal = ($tipoDocumento === 'CC') ? 1 : 2;

            // Tabela TIPODOCUMENTO (validade)
            $dataValidade = $dados['anoValidade'] . "-" . 
                            $dados['mesValidade'] . "-" . 
                            $dados['diaValidade'];
            
            $stmtV = $pdo->prepare("UPDATE TIPODOCUMENTO 
                                    SET validade = :val 
                                    WHERE id_documento = :id");
            $stmtV->execute([
                ':val' => $dataValidade,
                ':id'  => $idDocFinal
            ]);

            // Tabela PESSOA
            // Formatar data de nascimento
            $dataNasc = $dados['anosNascimento'] . "-" . 
                        $dados['mesesNascimento'] . "-" . 
                        $dados['diasNascimento'];

            $sqlP = "UPDATE PESSOA SET 
                        nome = :nome, 
                        data_nascimento = :data_nasc, 
                        genero_id = :gen_id, 
                        documento_id = :doc_id, 
                        morada_id = :mor_id,
                        nacionalidade = :nacio,
                        telemovel = :tele,
                        email = :email
                     WHERE nif = :nif";

            $pdo->prepare($sqlP)->execute([
                ':nome'      => $dados['nomeCompleto'],
                ':data_nasc' => $dataNasc,
                ':gen_id'    => $genId,
                ':doc_id'    => $idDocFinal,
                ':mor_id'    => $moradaId,
                ':nacio'     => $dados['nacionalidade'],
                ':tele'      => $dados['telemovel'],
                ':email'     => $dados['email'],
                ':nif'       => $dados['nif']
            ]);

            $pdo->commit();
            echo json_encode(["status" => "success", "message" => "Perfil atualizado com sucesso!"]);
        }
    }
} catch (Exception $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>