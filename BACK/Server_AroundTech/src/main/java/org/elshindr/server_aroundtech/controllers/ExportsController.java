package org.elshindr.server_aroundtech.controllers;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.elshindr.server_aroundtech.services.ExportsService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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

        return exportsSvc.exportJsonToExcel(jsonMap);
    }
}
