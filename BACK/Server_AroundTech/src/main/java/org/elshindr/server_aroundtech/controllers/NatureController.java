package org.elshindr.server_aroundtech.controllers;

import org.elshindr.server_aroundtech.models.Nature;
import org.elshindr.server_aroundtech.repositories.UserRepository;
import org.elshindr.server_aroundtech.services.NatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * NatureController
 * Controller des natures de missions
 */
@RestController
@RequestMapping("/natures")
public class NatureController {


        @Autowired
        private NatureService natSvc;

        @GetMapping
        public List<Nature> getlstNatures() {
            return this.natSvc.findAll();
        }

        @GetMapping("{idNature}")
        public Nature getOneNature(@PathVariable Integer idNature) {
                return this.natSvc.findOne(idNature);
        }

        @GetMapping("byDate/")
        public List<Nature> getlstNaturesByDateEmpty(){return this.natSvc.findNatureByDate(null);}

        @GetMapping("byDate/{date}")
        public List<Nature> findNatureByDate(@PathVariable(name = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> date) {

                if(date.isPresent()){
                        return this.natSvc.findNatureByDate(date.get());
                }

                return this.natSvc.findAll();
        }

        @PostMapping
        public ResponseEntity<?> createNature(@RequestBody Map<String, Object> jsonMap) {
                System.out.println(jsonMap);
                if(this.natSvc.createNature(jsonMap)){
                        return ResponseEntity.ok().body("");
                }

                return ResponseEntity.badRequest().body("");
        }

        @PutMapping("{idNature}")
        public ResponseEntity<?> createNature(@RequestBody Map<String, Object> jsonMap, @PathVariable Integer idNature) {
                System.out.println(jsonMap);
                if(this.natSvc.updateNature(jsonMap, idNature)){
                        return ResponseEntity.ok().body("");
                }

                return ResponseEntity.badRequest().body("");
        }

        @DeleteMapping("{idNature}")
        public ResponseEntity<?> deleteNature(@PathVariable Integer idNature){
                if (this.natSvc.deleteNature(idNature)){
                        return ResponseEntity.ok().body("");
                }
                return ResponseEntity.badRequest().body("");
        }

}
