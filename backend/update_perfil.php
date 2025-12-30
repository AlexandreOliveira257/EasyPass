<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

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

            // Género: 'Masculino' -> 1, 'Feminino' -> 2, 'Outro' -> 3
            switch ($dados['genero']) {
                case 'Masculino':
                    $genero_id = '1';
                    break;
                case 'Feminino':
                    $genero_id = '2';
                    break;
                default:
                    $genero_id = '3';
            }

            // Tabela TIPODOCUMENTO (validade)
            $dataValidade = $dados['anoValidade'] . "-" . 
                            $dados['mesValidade'] . "-" . 
                            $dados['diaValidade'];
            
            if ($docId) {
                // Atualiza a validade no documento já associado à pessoa
                $sqlV = "UPDATE TIPODOCUMENTO SET validade = :val WHERE id_documento = :id";
                $pdo->prepare($sqlV)->execute([':val' => $dataValidade, ':id' => $docId]);
            }

            // Tabela PESSOA
            $dataNasc = $dados['anosNascimento'] . "-" . 
                        $dados['mesesNascimento'] . "-" . 
                        $dados['diasNascimento'];

            // Género: 'Masculino' -> 1, 'Feminino' -> 2, 'Outro' -> 3
            switch ($dados['genero']) {
                case 'Masculino':
                    $genId = 1;
                    break;
                case 'Feminino':
                    $genId = 2;
                    break;
                default:
                    $genId = 3;
            }

            // Tipo Documento Identificação: 'Cartão Cidadão' -> 1, 'Carta Condução' -> 2
            $tipoDocumento = ($dados['tipoDocumentoIdentificacao'] === 'CC') ? 1 : 2;

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
                ':doc_id'    => $tipoDocumento,
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