package org.elshindr.server_aroundtech.services;

import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.pdf.*;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.poi.ss.usermodel.Workbook;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.elshindr.server_aroundtech.dtos.MissionDto;
import org.elshindr.server_aroundtech.dtos.UserDto;
import org.elshindr.server_aroundtech.models.Expense;
import org.elshindr.server_aroundtech.models.Mission;
import org.elshindr.server_aroundtech.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;


/**
 * The type Exports service.
 */
@Service
public class ExportsService {

    @Autowired
    private ExpenseService expSrv;

    @Autowired
    private UserService userSrv;

    @Autowired
    private MissionService misSrv;

    private TemplateEngine templateEngine;


    @Autowired
    public ExportsService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }


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
     * Appellé par exportJsonToExcel
     *
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


    public ByteArrayOutputStream exportPdfdd(Map<String, Object> jsonMap) throws DocumentException {
        try {
            // Usual
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");

            // Get User, mission and expenses datas
            User user = this.userSrv.getUserById((Integer) jsonMap.get("idUser"));
            MissionDto mission = this.misSrv.getOneMissionByUserAndId(user.getId(), (Integer) jsonMap.get("idMission"));
            List<Expense> lstExpenses = this.expSrv.getLstExpensesByUserAndMission(user.getId(), mission.getId());


            // Create the pdf
            Document document = new Document();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // Header Page
            Font fontHeaderPage = FontFactory.getFont(FontFactory.HELVETICA, 12, 1, BaseColor.DARK_GRAY);
            Paragraph headerPage = new Paragraph("Copy", fontHeaderPage);

            Rectangle pageSize = document.getPageSize();
            float x = pageSize.getWidth() / 2;
            float y = pageSize.getTop() - 20;

            document.addTitle("MON TITRE");
            document.addCreationDate();
            document.addHeader("Note de fdfdfdfd", "Note de frais émise le " + LocalDate.now().format(formatter));
            document.add(headerPage);

            // Title
            Font fontTitle = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
            Chunk chkTitle = new Chunk("Note de frais", fontTitle);
            document.add(chkTitle);
            document.add(new Paragraph("\n"));


            // Resume


            Font fontResume = FontFactory.getFont(FontFactory.HELVETICA, 11, BaseColor.BLACK);
            Paragraph chkResume = new Paragraph("Résumé :", fontResume);
            document.add(chkResume);

            // Table of lstExpenses
            PdfPTable table = new PdfPTable(3);

            /// Header of table
            Stream.of("Date", "Prix", "Motif")
                    .forEach(columnTitle -> {
                        PdfPCell headerTable = new PdfPCell();
                        headerTable.setBackgroundColor(BaseColor.WHITE);
                        headerTable.setBorderWidth(1);
                        headerTable.setPhrase(new Phrase(columnTitle));
                        table.addCell(headerTable);
                    });

            /// Rows

            document.add(table);


            document.setPageCount(1);
            document.close();
            return outputStream;

        } catch (DocumentException e) {
            throw new DocumentException(e);
        }
    }


    /**
     * Export json to pdf response entity.
     *
     * @param jsonMap the json data
     * @return the response entity
     * @throws IOException the io exception
     */
    public ByteArrayOutputStream exportPdf(Map<String, Object> jsonMap) throws IOException {
        try {

            // Usual
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");

            // Get User, mission and expenses datas
            User user = this.userSrv.getUserById((Integer) jsonMap.get("idUser"));
            MissionDto mission = this.misSrv.getOneMissionByUserAndId(user.getId(), (Integer) jsonMap.get("idMission"));

            List<Expense> lstExpenses = this.expSrv.getLstExpensesByUserAndMission(user.getId(), mission.getId());


            // Create Thymeleaf template
            System.out.println("creation context");
            Context context = new Context();
            context.setVariable("dateStart", mission.getStartDate().format(formatter));
            context.setVariable("dateEnd", mission.getEndDate().format(formatter));
            context.setVariable("lastname", user.getLastname().toUpperCase());
            context.setVariable("firstname", user.getFirstname());
            context.setVariable("idMission", mission.getId());
            context.setVariable("idUser", user.getId());
            context.setVariable("cityDepart", mission.getDepartCity().getName());
            context.setVariable("cityArrival", mission.getArrivalCity().getName());
            context.setVariable("nature", mission.getNatureCur().getName());
            context.setVariable("transport", mission.getTransport().getName());
            context.setVariable("expenseTotal", String.format("%.2f", mission.getTotalExpenses()));
            context.setVariable("lstExpenses", lstExpenses);

            String templatePdf = templateEngine.process("PdfExpensesByMission", context);


            // Create pdf from template
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(templatePdf);
            renderer.layout();
            renderer.createPDF(outputStream);

            outputStream.close();
            return outputStream;

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
