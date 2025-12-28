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
                // se tiver ID, atualizar morada existente
                $sqlM = "UPDATE MORADA SET rua = :rua, codigo_postal = :cp, concelho = :concelho, pais_residente = :pais WHERE id_morada = :id";
                $stmtM = $pdo->prepare($sqlM);
                $stmtM->execute([
                    ':rua' => $dados['morada'],
                    ':cp'  => $dados['codPostal'],
                    ':concelho' => $dados['localidade'],
                    ':pais' => $dados['pais'],
                    ':id'  => $moradaId
                ]);
            } else {
                // se nao tiver, inserir nova morada e guardar ID
                $sqlM = "INSERT INTO MORADA (rua, codigo_postal, concelho, pais_residente) VALUES (:rua, :cp, :concelho, :pais)";
                $stmtM = $pdo->prepare($sqlM);
                $stmtM->execute([
                    ':rua' => $dados['morada'],
                    ':cp'  => $dados['codPostal'],
                    ':concelho' => $dados['localidade'],
                    ':pais' => $dados['pais']
                ]);
                $moradaId = $pdo->lastInsertId();
            }

            // Género: 'Masculino' -> 1, 'Feminino' -> 2 (confirmar IDs  tabela GENERO)
            $genero_id = ($dados['genero'] === 'Masculino') ? 1 : 2; 
            
            // Tipo Documento: 'CC' -> 1, 'CARTA' -> 2 (confirmar na tabela TIPODOCUMENTO)
            $tipo_doc_id = ($dados['tipoDocumento'] === 'CC') ? 1 : 2;

            // tabela PESSOA
            $dataNasc = $dados['anoNasc'] . "-" . $dados['mesNasc'] . "-" . $dados['diaNasc'];

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

            $stmtP = $pdo->prepare($sqlP);
            $stmtP->execute([
                ':nome'      => $dados['nomeCompleto'],
                ':data_nasc' => $dataNasc,
                ':gen_id'    => $genero_id,
                ':doc_id'    => $tipo_doc_id,
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