package org.elshindr.server_aroundtech.controllers;

import org.elshindr.server_aroundtech.services.ExportsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RequestMapping("/exports")
@RestController
public class ExportsController {

    private ExportsService exportsSvc;

    @PostMapping
    public ResponseEntity<byte[]> exportExcel(@RequestBody Map<String, Object> jsonMap) throws IOException {
        System.out.println("in export");
        System.out.println(jsonMap);
        return this.exportsSvc.exportJsonToExcel(jsonMap);
    }



    @GetMapping("/telechargerFichierExcel")
    public ResponseEntity<byte[]> telechargerFichierExcel() {
        try {
            // Générer votre fichier Excel
            Workbook workbook = generateExcelFile();

            // Convertir le classeur en un tableau d'octets
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            // Ajouter les en-têtes pour indiquer au navigateur que le contenu est un fichier Excel téléchargeable
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "mesprimes.xlsx");

            // Retourner une réponse avec le contenu du fichier Excel
            return ResponseEntity.ok().headers(headers).body(outputStream.toByteArray());
        } catch (IOException e) {
            e.printStackTrace();
            // Gérer l'erreur ici
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
