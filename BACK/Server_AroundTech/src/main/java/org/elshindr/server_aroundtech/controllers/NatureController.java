package org.elshindr.server_aroundtech.controllers;

import org.elshindr.server_aroundtech.models.Nature;
import org.elshindr.server_aroundtech.services.NatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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

        /**
         * Gets natures.
         *
         * @return the natures
         */
        @GetMapping
        public List<Nature> getlstNatures() {
            return this.natSvc.findAll();
        }

        /**
         * Gets one nature.
         *
         * @param idNature the id nature
         * @return the one nature
         */
        @GetMapping("{idNature}")
        public Nature getOneNature(@PathVariable Integer idNature) {
                return this.natSvc.findOne(idNature);
        }

        /**
         * Getlst natures by date empty list.
         *
         * @return the list
         */
        @GetMapping("byDate/")
        public List<Nature> getlstNaturesByDateEmpty(){return this.natSvc.findNatureByDate(null);}

        /**
         * Find nature by date list.
         *
         * @param date the date
         * @return the list
         */
        @GetMapping("byDate/{date}")
        public List<Nature> findNatureByDate(@PathVariable(name = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> date) {

                if(date.isPresent()){
                        return this.natSvc.findNatureByDate(date.get());
                }

                return this.natSvc.findAll();
        }

        /**
         * Create nature response entity.
         *
         * @param jsonMap the json map
         * @return the response entity
         */
        @PostMapping
        public ResponseEntity<?> createNature(@RequestBody Map<String, Object> jsonMap) {
                System.out.println(jsonMap);
                if(this.natSvc.createNature(jsonMap)){
                        return ResponseEntity.ok().body("");
                }

                return ResponseEntity.badRequest().body("");
        }

        /**
         * Create nature response entity.
         *
         * @param jsonMap  the json map
         * @param idNature the id nature
         * @return the response entity
         */
        @PutMapping("{idNature}")
        @Secured("ROLE_ADMIN")
        public ResponseEntity<?> createNature(@RequestBody Map<String, Object> jsonMap, @PathVariable Integer idNature) {
                System.out.println(jsonMap);
                if(this.natSvc.updateNature(jsonMap, idNature)){
                        return ResponseEntity.ok().body("");
                }

                return ResponseEntity.badRequest().body("");
        }

        /**
         * Delete nature response entity.
         *
         * @param idNature the id nature
         * @return the response entity
         */
        @DeleteMapping("{idNature}")
        @Secured("ROLE_ADMIN")
        public ResponseEntity<?> deleteNature(@PathVariable Integer idNature){
                if (this.natSvc.deleteNature(idNature)){
                        return ResponseEntity.ok().body("");
                }
                return ResponseEntity.badRequest().body("");
        }

}
