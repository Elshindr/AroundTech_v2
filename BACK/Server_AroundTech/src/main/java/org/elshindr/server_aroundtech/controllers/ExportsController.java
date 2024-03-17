package org.elshindr.server_aroundtech.controllers;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.elshindr.server_aroundtech.services.ExportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.itextpdf.text.DocumentException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/exports")
@RestController
public class ExportsController {

    @Autowired
    private ExportsService exportsSvc;


    @PostMapping("/xls")
    public ResponseEntity<byte[]> exportExcel(@RequestBody Map<String, Object> jsonMap) throws IOException {
        return this.exportsSvc.exportJsonToExcel(jsonMap);
    }


    @PostMapping("/pdf")
    public ResponseEntity<byte[]> exportPdf(@RequestBody Map<String, Object> jsonMap) throws IOException, DocumentException {
        List<Map<String, Object>> queryResults = new ArrayList<>();
        queryResults.add(jsonMap);

        ByteArrayOutputStream pdfStream = exportsSvc.exportPdf(queryResults);


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=query_results.pdf");
        headers.setContentLength(pdfStream.size());
        return new ResponseEntity<>(pdfStream.toByteArray(), headers, HttpStatus.OK);
    }


}
