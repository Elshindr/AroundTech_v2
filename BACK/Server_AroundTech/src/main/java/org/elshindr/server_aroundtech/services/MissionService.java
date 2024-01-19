package org.elshindr.server_aroundtech.services;

import org.apache.commons.lang3.math.NumberUtils;
import org.elshindr.server_aroundtech.dtos.MissionDto;
import org.elshindr.server_aroundtech.models.Expense;
import org.elshindr.server_aroundtech.models.Mission;
import org.elshindr.server_aroundtech.models.Motif;
import org.elshindr.server_aroundtech.repositories.MissionRepository;
import org.elshindr.server_aroundtech.repositories.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class MissionService {

    @Autowired
    private UserService userSvc;

    @Autowired
    private MissionRepository misRepo;
    @Autowired
    private StatusRepository statusRepo;

    public List<MissionDto> getAllByUser(Integer idUser){
        List<Mission> lstMissions = this.misRepo.findMissionByUser(idUser).stream().toList();
        System.out.println(lstMissions);
        return lstMissions.stream().map(mission -> MissionDto.parseMissionToMissionDto(mission)).toList();
    }


    public MissionDto getOneMissionByUserAndId(Integer idUser, Integer idMission) {
        return MissionDto.parseMissionToMissionDto(misRepo.findOneMissionByUserAndId(idUser, idMission));
    }


    public List<MissionDto> getLstMissionsInWaitByManager(Integer idManager){
        List<Mission> lstMissions = this.misRepo.getLstMissionsInWaitByManager(idManager).stream().toList();
        return lstMissions.stream().map(mission -> MissionDto.parseMissionToMissionDto(mission)).toList();
    }

    public Boolean updateMissionStatus(Integer idMission, Map<String, Object> jsonMap){
        try {
            Mission updMission = this.misRepo.findDistinctById(idMission).get();

            if (jsonMap.get("idStatus") != null) {
                Integer idStatus = NumberUtils.toInt(jsonMap.get("idStatus").toString(), 0);

                updMission.setStatus(this.statusRepo.findDistinctById(idStatus).get());
            }

            misRepo.save(updMission);

            return true;

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            System.out.println(ex);
            return false;
        }
    }
}
