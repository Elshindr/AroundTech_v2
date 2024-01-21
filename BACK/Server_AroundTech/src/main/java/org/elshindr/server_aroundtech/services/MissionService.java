package org.elshindr.server_aroundtech.services;

import org.apache.commons.lang3.math.NumberUtils;
import org.elshindr.server_aroundtech.dtos.MissionDto;
import org.elshindr.server_aroundtech.models.*;
import org.elshindr.server_aroundtech.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class MissionService {

    @Autowired
    private UserService userSvc;
    @Autowired
    private NatureService natSvc;
    @Autowired
    private TransportService trpSvc;

    @Autowired
    private MissionRepository misRepo;
    @Autowired
    private StatusRepository statusRepo;
    @Autowired
    private CityRepository cityRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private NatureRepository natRepo;

    public List<MissionDto> getAllByUser(Integer idUser) {
        List<Mission> lstMissions = this.misRepo.findMissionByUser(idUser).stream().toList();
        return lstMissions.stream().map(mission -> MissionDto.parseMissionToMissionDto(mission)).toList();
    }


    public MissionDto getOneMissionByUserAndId(Integer idUser, Integer idMission) {
        return MissionDto.parseMissionToMissionDto(misRepo.findOneMissionByUserAndId(idUser, idMission));
    }


    public List<MissionDto> getLstMissionsInWaitByManager(Integer idManager) {
        List<Mission> lstMissions = this.misRepo.getLstMissionsInWaitByManager(idManager).stream().toList();
        return lstMissions.stream().map(mission -> MissionDto.parseMissionToMissionDto(mission)).toList();
    }


    public Boolean updateMissionStatus(Integer idMission, Map<String, Object> jsonMap) {
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


    public Boolean checkIfMissionExistByUserAndDate(Integer idUser, LocalDate date) {
        try {
            List<Mission> lstMissionByUser = this.misRepo.findMissionByUserAndDate(idUser, date);
            if (lstMissionByUser.isEmpty()) {
                return true;
            }

            return false;

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            System.out.println(ex);
            return false;
        }
    }


    public Boolean isMissionExist(Map<String, Object> jsonMap) {

        try {

            LocalDate lcDate = null;
            if (jsonMap.containsKey("date")) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                lcDate = LocalDate.parse((String) jsonMap.get("date"), formatter);
            }

            Integer idUser = null;
            if (jsonMap.containsKey("idUser")) {

                try {
                    idUser = Integer.parseInt(jsonMap.get("idUser").toString());

                } catch (NumberFormatException e) {
                    System.out.println("La chaîne ne peut pas être convertie en int : " + e.getMessage());
                    throw new Exception("idUser ne peut pas être convertie en int : " + e.getMessage());

                }
            }

            Integer idMission = null;
            if (jsonMap.containsKey("idMission")) {
                try {
                    idMission = NumberUtils.toInt(jsonMap.get("idMission").toString());

                } catch (NumberFormatException e) {
                    System.out.println("La chaîne ne peut pas être convertie en int : " + e.getMessage());
                    throw new Exception("idMission ne peut pas être convertie en int : " + e.getMessage());

                }
            }

            int nbMissions = 0;
            if (idUser != null && lcDate != null) {

                List<Mission> lstMissions = this.misRepo.findMissionByUserBetweenDate(idUser, lcDate);
                nbMissions = lstMissions.size();

                if (nbMissions == 1 && idMission != null && Objects.equals(lstMissions.get(0).getId(), idMission)) { // Update
                    nbMissions = 0;
                }
            }

            if (nbMissions == 0) {
                return true;
            }
            return false;


        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            System.out.println(ex.toString());
            return null;
        }
    }

    public Boolean addMission(MissionDto missionDto) {
        try {
            // Gestion des villes
            Optional<City> arrivalCity = this.cityRepo.findDistinctByName(missionDto.getArrivalCity().getName());
            Optional<City> departCity = this.cityRepo.findDistinctByName(missionDto.getDepartCity().getName());

            if(!arrivalCity.isPresent() || arrivalCity.isEmpty()){
                arrivalCity = Optional.of(new City(missionDto.getArrivalCity().getName()));
                this.cityRepo.save(arrivalCity.get());
            }

            if(!departCity.isPresent()|| departCity.isEmpty()){
                departCity = Optional.of(new City(missionDto.getDepartCity().getName()));
                this.cityRepo.save(departCity.get());
            }

            // Gestion Transport
            Optional<Transport> transport = this.trpSvc.getDistinctTransportById(missionDto.getTransport().getId());

            // Status
            Optional<Status> status = this.statusRepo.findDistinctById(5);

            // User
            Optional<User> user = this.userRepo.findDistinctById(missionDto.getUserId());

            // Natures
            Optional<Nature> natureCur = this.natRepo.findDistinctById(missionDto.getNatureCur().getId());
            Optional<Nature> natureInit = this.natRepo.findDistinctById(missionDto.getNatureInit().getId());

            Mission newMission = new Mission(
                    natureCur.get(),
                    departCity.get(),
                    arrivalCity.get(),
                    missionDto.getStartDate(),
                    missionDto.getEndDate(),
                    status.get(),
                    user.get(),
                    transport.get(),
                    natureInit.get()
            );
            this.misRepo.save(newMission);

            return true;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            System.out.println(ex.toString());
            return false;
        }
    }

    public Boolean updateMission(MissionDto missionDto){
        try {
            Mission uptMission = this.misRepo.findOneMissionByUserAndId(missionDto.getUserId(), missionDto.getId());

            if(!uptMission.getStatus().getId().equals(5) && !uptMission.getStatus().getId().equals(6)){
                throw new Exception("Cette mission ne peut être modifiée: Status="+uptMission.getStatus().getName());
            }

            // Gestion des villes
            Optional<City> arrivalCity = this.cityRepo.findDistinctByName(missionDto.getArrivalCity().getName());
            Optional<City> departCity = this.cityRepo.findDistinctByName(missionDto.getDepartCity().getName());

            if(!arrivalCity.isPresent() || arrivalCity.isEmpty()){
                arrivalCity = Optional.of(new City(missionDto.getArrivalCity().getName()));
                this.cityRepo.save(arrivalCity.get());
            }

            if(!departCity.isPresent()|| departCity.isEmpty()){
                departCity = Optional.of(new City(missionDto.getDepartCity().getName()));
                this.cityRepo.save(departCity.get());
            }

            // Gestion Transport
            Optional<Transport> transport = this.trpSvc.getDistinctTransportById(missionDto.getTransport().getId());

            // Status
            Optional<Status> status = this.statusRepo.findDistinctById(5);

            // User
            Optional<User> user = this.userRepo.findDistinctById(missionDto.getUserId());

            // Natures
            Optional<Nature> natureCur = this.natRepo.findDistinctById(missionDto.getNatureCur().getId());
            Optional<Nature> natureInit = this.natRepo.findDistinctById(missionDto.getNatureInit().getId());

            uptMission.setArrivalCity(arrivalCity.get());
            uptMission.setDepartCity(departCity.get());
            uptMission.setEndDate(missionDto.getEndDate());
            uptMission.setStartDate(missionDto.getStartDate());
            uptMission.setNatureCur(natureCur.get());
            uptMission.setNatureInit(natureInit.get());
            uptMission.setTransport(transport.get());
            uptMission.setStatus(status.get());
            this.misRepo.save(uptMission);

            return true;

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            System.out.println(ex.toString());
            return false;
        }
    }

    public Boolean deleteMission(Integer idMission){
        try {
            Optional<Mission> mission = this.misRepo.findDistinctById(idMission);

            this.misRepo.delete(mission.get());

            return true;

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            System.out.println(ex);
            return false;
        }
    }
}
