package org.elshindr.server_aroundtech.controllers;

import org.elshindr.server_aroundtech.models.Motif;
import org.elshindr.server_aroundtech.repositories.UserRepository;
import org.elshindr.server_aroundtech.services.MotifService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


/**
 * MotifController
 * Controller des motifs des notes de frais
 */
@RestController
@RequestMapping("/motifs")
public class MotifController {



    @Autowired
    private MotifService motSvc;


    @GetMapping
    public List<Motif> getlstMotifs() {
        return this.motSvc.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createMotif(@RequestBody Map<String, Object> jsonMap) {
        System.out.println(jsonMap);
        if(this.motSvc.createMotif(jsonMap)){
            return ResponseEntity.ok().body("");
        }

        return ResponseEntity.badRequest().body("");
    }

    @PutMapping("{idMotif}")
    public ResponseEntity<?> updateMotif(@PathVariable Integer idMotif, @RequestBody Map<String, Object> jsonMap) {
        if(this.motSvc.updateMotif(jsonMap, idMotif)){
            return ResponseEntity.ok().body("");
        }
        return ResponseEntity.badRequest().body("");
    }

    @DeleteMapping("{idMotif}")
    public ResponseEntity<?> deleteMotif(@PathVariable Integer idMotif){
        if (this.motSvc.deleteMotif(idMotif)){
            return ResponseEntity.ok().body("");
        }
        return ResponseEntity.badRequest().body("");
    }

}