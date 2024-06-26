package org.elshindr.server_aroundtech.services;

import org.apache.commons.lang3.math.NumberUtils;
import org.elshindr.server_aroundtech.dtos.MissionDto;

import org.elshindr.server_aroundtech.models.*;
import org.elshindr.server_aroundtech.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

/**
 * The type Mission service.
 */
@Service
public class MissionService {

    @Autowired
    private UserService userSvc;
    @Autowired
    private NatureService natSvc;
    @Autowired
    private TransportService trpSvc;
    @Autowired
    private ExpenseService expSvc;

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


    /**
     * Gets all by user.
     *
     * @param idUser the id user
     * @return the all by user
     */
    public List<MissionDto> getAllByUser(Integer idUser) {
        List<Mission> lstMissions = this.misRepo.findMissionByUser(idUser).stream().toList();

        return lstMissions.stream().map(mission -> {
            List<Expense> lstExpenses = this.expSvc.getLstExpensesByUserAndMission(idUser, mission.getId());
            BigDecimal totalExpenses = lstExpenses.stream().map(expense -> {

                System.out.println(expense.getAmount());
                return expense.getAmount();}).reduce(BigDecimal.ZERO, (a, b) -> a.add(b));

             return  new MissionDto(mission, totalExpenses);
        }).toList();
    }


    /**
     * Gets one mission by user and id.
     *
     * @param idUser    the id user
     * @param idMission the id mission
     * @return the one mission by user and id
     */
    public MissionDto getOneMissionByUserAndId(Integer idUser, Integer idMission) {
        List<Expense> lstExpenses = this.expSvc.getLstExpensesByUserAndMission(idUser, idMission);

        BigDecimal totalExpenses = MissionDto.calculateTotalExpenses(misRepo.findDistinctById(idMission).get(), lstExpenses);
        Mission mission = misRepo.findOneMissionByUserAndId(idUser, idMission);

        return  new MissionDto(mission, totalExpenses);
    }


    /**
     * Gets lst missions in wait by manager.
     *
     * @param idManager the id manager
     * @return the lst missions in wait by manager
     */
    public List<MissionDto> getLstMissionsInWaitByManager(Integer idManager) {


        List<Mission> lstMissions = this.misRepo.getLstMissionsInWaitByManager(idManager).stream().toList();

        return lstMissions.stream().map(mission -> {
            List<Expense> lstExpenses = this.expSvc.getLstExpensesByUserAndMission(mission.getUser().getId(), mission.getId());
             return new MissionDto(mission, MissionDto.calculateTotalExpenses(mission, lstExpenses));
        }).toList();
    }

    /**
     * Gets missions by status.
     *
     * @param idStatus the id status
     * @return list of Missions
     */
    public List<Mission> getLstMissionsByStatus(Integer idStatus){
        return this.misRepo.findMissionByStatus(idStatus);
    }

    /**
     * Update mission status boolean.
     *
     * @param idMission the id mission
     * @param jsonMap   the json map
     * @return the boolean
     */
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


    /**
     * Check if mission exist by user and date boolean.
     *
     * @param idUser the id user
     * @param date   the date
     * @return the boolean
     */
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


    /**
     * Is mission exist boolean.
     *
     * @param jsonMap the json map
     * @return the boolean
     */
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

    /**
     * Add mission boolean.
     *
     * @param missionDto the mission dto
     * @return the boolean
     */
    public Boolean addMission(MissionDto missionDto) {

        System.out.println(missionDto.toString());
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
            System.out.println("arrvie "+arrivalCity.toString());
            System.out.println("depart "+departCity.toString());

            // Gestion Transport
            Optional<Transport> transport = this.trpSvc.getDistinctTransportById(missionDto.getTransport().getId());
            System.out.println("transport"+transport);
            // Status
            Optional<Status> status = this.statusRepo.findDistinctById(5);

            // User
            Optional<User> user = this.userRepo.findDistinctById(missionDto.getUserId());

            System.out.println("user"+user);

            // Natures
            Optional<Nature> natureCur = this.natRepo.findDistinctById(missionDto.getNatureCur().getId());
            Optional<Nature> natureInit = this.natRepo.findDistinctById(missionDto.getNatureInit().getId());

            System.out.println(natureCur);
            System.out.println(natureInit);
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

    /**
     * Update mission boolean.
     *
     * @param missionDto the mission dto
     * @return the boolean
     */
    public Boolean updateMission(MissionDto missionDto){
        try {
            Mission uptMission = this.misRepo.findOneMissionByUserAndId(missionDto.getUserId(), missionDto.getId());

            /*if(!uptMission.getStatus().getId().equals(55) && !uptMission.getStatus().getId().equals(66)){
                throw new Exception("Cette mission ne peut être modifiée: Status="+uptMission.getStatus().getName());
            }*/

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

            if(missionDto.getStartDate().isBefore(missionDto.getEndDate())){


            uptMission.setEndDate(missionDto.getEndDate());
            uptMission.setStartDate(missionDto.getStartDate());
            uptMission.setNatureCur(natureCur.get());
            uptMission.setNatureInit(natureInit.get());
            uptMission.setTransport(transport.get());
            uptMission.setStatus(status.get());
            this.misRepo.save(uptMission);

            return true;
            } else{
                throw new Exception("Date de début après la date de fin de mission");
            }

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            System.out.println(ex.toString());
            return false;
        }
    }

    /**
     * Maj du status d'une mission
     * @param idMission
     * @param idStatus
     * @return boolean vrai si maj reussi
     */
    public Boolean updateMissionByStatus(Integer idMission, Integer idStatus){

        try{
            Status newStatus = this.statusRepo.findDistinctById(idStatus).get();
            Mission updatMssin =  this.misRepo.findDistinctById(idMission).get();
            updatMssin.setStatus(newStatus);
            this.misRepo.save(updatMssin);

            return true;
        } catch(Exception e){
            return false;
        }

    }

    /**
     * Delete mission boolean.
     *
     * @param idMission the id mission
     * @return the boolean
     */
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
