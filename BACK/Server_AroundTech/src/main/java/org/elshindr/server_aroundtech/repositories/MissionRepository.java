package org.elshindr.server_aroundtech.repositories;

import org.elshindr.server_aroundtech.models.Mission;
import org.elshindr.server_aroundtech.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * MissionRepository
 * Interface de récupération des données du model Mission via JPA
 */
public interface MissionRepository extends JpaRepository<Mission, Integer> {

    Optional<Mission> findDistinctByUser(User user);
    Optional<Mission> findDistinctById(Integer id);

    @Query("SELECT m FROM Mission m WHERE m.user.id = :idUser")
    List<Mission> findMissionByUser(@Param("idUser") Integer idUser);

    @Query("SELECT m FROM Mission m WHERE m.user.id = :idUser AND m.startDate = :date")
    List<Mission> findMissionByUserAndDate(@Param("idUser") Integer idUser, LocalDate date);

    @Query("SELECT m FROM Mission m WHERE m.user.idManager = :idManager AND m.status.id = 2")
    List<Mission> getLstMissionsInWaitByManager(@Param("idManager") Integer idManager);

    @Query("SELECT m FROM Mission m WHERE m.user.id = :idUser AND m.id = :idMission")
    Mission findOneMissionByUserAndId(@Param("idUser") Integer idUser, @Param("idMission") Integer idMission);

    @Query("SELECT m FROM Mission m WHERE m.user.id = :idUser AND m.id = :idMission AND m.startDate = :date")
    List<Mission> getListMissionsByUserDateAndMission(@Param("idUser") Integer idUser, @Param("date")LocalDate date, @Param("idMission") Integer idMission);
}

