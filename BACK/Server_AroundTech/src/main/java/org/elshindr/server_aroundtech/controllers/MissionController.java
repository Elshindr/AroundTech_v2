package org.elshindr.server_aroundtech.controllers;


import org.elshindr.server_aroundtech.dtos.MissionDto;
import org.elshindr.server_aroundtech.models.Mission;
import org.elshindr.server_aroundtech.repositories.UserRepository;
import org.elshindr.server_aroundtech.services.MissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private UserRepository userRepo;
    @Autowired
    private MissionService misSvc;


    @GetMapping("byUser/{idUser}")
    public List<MissionDto> getLstMissionByUser(@PathVariable Integer idUser) {
        return this.misSvc.getAllByUser(idUser);
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
}
