package org.elshindr.server_aroundtech.services;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.poi.ss.usermodel.Workbook;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;


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

    /**
     * Rempli une cellule avec la valeur données
     * @param cell
     * @param value
     */
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


    public static ByteArrayOutputStream exportPdf(List<Map<String, Object>> queryResults) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, outputStream);
        document.open();        // Write column names


        Map<String, Object> firstRow = queryResults.get(0);
        for (String column : firstRow.keySet()) {
            Font boldFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            Paragraph paragraph = new Paragraph(column, boldFont);
            document.add(paragraph);
        }
        document.add(new Paragraph("\n"));        // Write data rows
        for (Map<String, Object> row : queryResults) {
            for (Object value : row.values()) {
                Paragraph paragraph = new Paragraph(value.toString());
                document.add(paragraph);
            }
            document.add(new Paragraph("\n"));
        }        document.close();
        return outputStream;
    }


    /**
     * Export json to pdf response entity.
     * @param jsonMap the json data
     * @return the response entity
     * @throws IOException the io exception
     */
    public static ResponseEntity<byte[]>  createPdfd(Map<String, Object> jsonMap) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.beginText();
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                contentStream.newLineAtOffset(100, 700);
                contentStream.showText("Hello, World!");
                contentStream.newLineAtOffset(100, 700);
                contentStream.showText("Hello, World!");
                contentStream.newLineAtOffset(100, 700);
                contentStream.showText("Hello, World!");
                contentStream.newLineAtOffset(100, 700);
                contentStream.showText("Hello, World!");
                contentStream.newLineAtOffset(100, 700);
                contentStream.showText("Hello, World!");
                contentStream.newLineAtOffset(100, 700);
                contentStream.showText("Hello, World!");
                contentStream.newLineAtOffset(100, 700);
                contentStream.showText("Hello, World!");



                contentStream.endText();
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            byte[] pdfBytes = baos.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "MesNotesDeFrais.pdf");

            return ResponseEntity.ok().headers(headers).contentLength(pdfBytes.length).body(pdfBytes);
        }
    }
}
