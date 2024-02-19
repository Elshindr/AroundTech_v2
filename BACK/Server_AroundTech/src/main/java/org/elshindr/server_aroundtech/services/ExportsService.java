package org.elshindr.server_aroundtech.services;


import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * The type Exports service.
 */
@Service
public class ExportsService {


    /**
     * Export json to excel response entity.
     *
     * @param jsonData the json data
     * @return the response entity
     * @throws IOException the io exception
     */
    public static ResponseEntity<byte[]> exportJsonToExcel(Map<String, Object> jsonData) throws IOException {

        // Créez un nouveau classeur Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Primes");

        // En-tête
        Row headerRow = sheet.createRow(0);
        int cellIndex = 0;
        for (String key : ((List<Map<String, Object>>) jsonData.get("primes")).stream().toList().get(0).keySet()) {
            Cell cell = headerRow.createCell(cellIndex++);
            cell.setCellValue(key);
        }

        // Corps
        int rowIndex = 1;
        for (Map<String, Object> data : ((List<Map<String, Object>>) jsonData.get("primes")).stream().toList()) {
            Row row = sheet.createRow(rowIndex++);
            cellIndex = 0;
            for (Object value : data.values()) {
                Cell cell = row.createCell(cellIndex++);
                setCellValue(cell, value);
            }
        }

        // Flux de sortie du fichier xls
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        // Réponse HTTP du fichier xls
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "mesprimes.xlsx");
        return ResponseEntity.ok().headers(headers).body(outputStream.toByteArray());
    }


    private static void setCellValue(Cell cell, Object value) {
        if (value == null) {
            cell.setCellValue("");
        } else if (value instanceof Number) {
            cell.setCellValue(((Number) value).doubleValue());
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else {
            cell.setCellValue(value.toString());
        }
    }
}
