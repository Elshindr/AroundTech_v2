package org.elshindr.server_aroundtech.controllers;


import org.elshindr.server_aroundtech.dtos.MissionDto;
import org.elshindr.server_aroundtech.services.MissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * MissionController
 * Controller des missions
 */
@RestController
@RequestMapping("/missions")
public class MissionController {


    @Autowired
    private MissionService misSvc;


    @GetMapping("byUser/{idUser}")
    public List<MissionDto> getLstMissionsByUser(@PathVariable Integer idUser) {
        return this.misSvc.getAllByUser(idUser);
    }


    @PostMapping("isMissionExist")
    public ResponseEntity<?> isMissionExist( @RequestBody Map<String, Object> jsonMap){
        if (Boolean.TRUE.equals(this.misSvc.isMissionExist(jsonMap))){
            return ResponseEntity.ok().body("true");
        } else if(Boolean.FALSE.equals(this.misSvc.isMissionExist(jsonMap))){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.badRequest().body("");
    }


    @PostMapping
    public ResponseEntity<?> addMission(@RequestBody MissionDto missionDto){

        if (Boolean.TRUE.equals(this.misSvc.addMission(missionDto))){
            return ResponseEntity.ok().body("true");
        }

        return ResponseEntity.badRequest().body("");
    }


    @PutMapping
    public ResponseEntity<?> updateMission(@RequestBody MissionDto missionDto){

        if (Boolean.TRUE.equals(this.misSvc.updateMission(missionDto))){
            return ResponseEntity.ok().body("true");
        }

        return ResponseEntity.badRequest().body("");
    }


    @GetMapping("{idUser}/{idMission}")
    public MissionDto getOneMissionByUserAndId(@PathVariable Integer idUser, @PathVariable Integer idMission) {
        return this.misSvc.getOneMissionByUserAndId(idUser, idMission);
    }


    @GetMapping("byManager/{idUser}")
    public List<MissionDto> getLstMissionsInWaitByManager(@PathVariable Integer idUser){
        return this.misSvc.getLstMissionsInWaitByManager(idUser);
    }


    @PutMapping("status/{idMission}")
    public ResponseEntity<?> updateMissionStatus(@PathVariable Integer idMission, @RequestBody Map<String, Object> jsonMap){
        if (this.misSvc.updateMissionStatus(idMission, jsonMap)){
            return ResponseEntity.ok().body("");
        }
        return ResponseEntity.badRequest().body("");
    }


    @GetMapping("byUser/{idUser}/byDate/{date}")
    //TODO : a fusionner avec isMissionExist
    public ResponseEntity<?> isMissionExistByUserAndDate(@PathVariable Integer idUser, @PathVariable(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date ){
        if (this.misSvc.checkIfMissionExistByUserAndDate(idUser, date) == true){
            return ResponseEntity.ok().body("");
        }
        return ResponseEntity.badRequest().body("");
    }




    @DeleteMapping("{idMission}")
    public ResponseEntity<?> deleteMission(@PathVariable(name="idMission") Integer idMission){
        if (Boolean.TRUE.equals(this.misSvc.deleteMission(idMission))){
            return ResponseEntity.ok().body("true");
        }

        return ResponseEntity.badRequest().body("");
    }
}
