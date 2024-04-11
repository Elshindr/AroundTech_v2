package org.elshindr.server_aroundtech.configs;
import org.elshindr.server_aroundtech.dtos.UserDto;
import org.elshindr.server_aroundtech.models.Mission;

import org.elshindr.server_aroundtech.services.EmailService;
import org.elshindr.server_aroundtech.services.MissionService;
import org.elshindr.server_aroundtech.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;

import java.util.*;
@Component
public class ScheduledTask {

    @Autowired
    EmailService emailSvc;

    @Autowired
    MissionService missionSvc;

    @Autowired
    UserService userSvc;

    @Scheduled(cron = "0 * * * * *")// Exécute la méthode toute les 1 min
    //@Scheduled(cron = "0 0 23 * * *")// Exécute la méthode à 23H
    public void executeTask() throws Exception {
        List<Mission> lstMissionInWait = this.missionSvc.getLstMissionsByStatus(5);
        Map<UserDto, List<Mission>> mapMissionsByManager = new HashMap<>();

        // Regrouper les missions par manager
        for (Mission mission : lstMissionInWait) {
            Integer userId = mission.getUser().getIdManager();
            UserDto managerDto = this.userSvc.findDistinctById(userId);

            if (mapMissionsByManager.containsKey(managerDto)) {
                List<Mission> missionsForManager = mapMissionsByManager.get(managerDto);
                missionsForManager.add(mission);
                mapMissionsByManager.put(managerDto, missionsForManager);
            } else {
                List<Mission> newMissionList = new ArrayList<>();
                newMissionList.add(mission);
                mapMissionsByManager.put(managerDto, newMissionList);
            }


           Boolean isUpdateSucces = this.missionSvc.updateMissionByStatus(mission.getId(), 2);
           /* if(!isUpdateSucces){
                throw new Exception(" Mise à jour du status de mission : echec" + mission);
            }*/
        }

        // Envoi du mail pour chaque manager concerné
        Set<UserDto> uniqueUserDtos = mapMissionsByManager.keySet();
        for (UserDto user : uniqueUserDtos) {
            Context context = new Context();
            context.setVariable("name", user.getLastname() + " " + user.getFirstname());
            context.setVariable("lstMissions", mapMissionsByManager.get(user));
            emailSvc.sendEmailWithHtmlTemplate(user.getEmail(), "AroundTech - Missions en attentes", "EmailMissionInWait", context);
        }
    }

}
