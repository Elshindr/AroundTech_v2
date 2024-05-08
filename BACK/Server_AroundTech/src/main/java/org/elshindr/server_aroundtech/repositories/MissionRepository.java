package org.elshindr.server_aroundtech.repositories;
import org.elshindr.server_aroundtech.models.Mission;
import org.elshindr.server_aroundtech.models.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * MissionRepository
 * Interface de récupération des données du model Mission via JPA
 */
@Repository
public interface MissionRepository extends JpaRepository<Mission, Integer> {

    /**
     * Find distinct by id.
     *
     * @param id the id
     * @return the optional mission
     */
    Optional<Mission> findDistinctById(Integer id);

    /**
     * Find list of mission by status
     * @param idStatus the new status
     * @return the list
     */
    @Query("SELECT m FROM Mission m WHERE m.status.id = :idStatus")
    List<Mission> findMissionByStatus(@Param("idStatus") Integer idStatus);

    /**
     * Find list of mission by user.
     *
     * @param idUser the id user
     * @return the list of missions
     */
    @Query("SELECT m FROM Mission m WHERE m.user.id = :idUser")
    List<Mission> findMissionByUser(@Param("idUser") Integer idUser);

    /**
     * Find list of mission by user and date.
     *
     * @param idUser the id user
     * @param date   the date
     * @return the list
     */
    @Query("SELECT m FROM Mission m WHERE m.user.id = :idUser AND m.startDate = :date")
    List<Mission> findMissionByUserAndDate(@Param("idUser") Integer idUser, LocalDate date);

    /**
     * Gets lst missions in waiting by manager.
     *
     * @param idManager the id manager
     * @return the lst missions in waiting by manager
     */
    @Query("SELECT m FROM Mission m WHERE m.user.idManager = :idManager AND m.status.id = 2")
    List<Mission> getLstMissionsInWaitByManager(@Param("idManager") Integer idManager);

    /**
     * Find one mission by user and id mission.
     *
     * @param idUser    the id user
     * @param idMission the id mission
     * @return the mission
     */
    @Query("SELECT m FROM Mission m WHERE m.user.id = :idUser AND m.id = :idMission")
    Mission findOneMissionByUserAndId(@Param("idUser") Integer idUser, @Param("idMission") Integer idMission);

    /**
     * Find mission by user between date list.
     *mission["date_debut"] <= nouvelle_mission["date_debut"] <= mission["date_fin"]) or \
     *            (mission["date_debut"] <= nouvelle_mission["date_fin"] <= mission["date_fin"]
     * @param idUser the id user
     * @param date   the date
     * @return the list
     */
    @Query("SELECT m FROM Mission m WHERE m.user.id = :idUser AND m.startDate <= :date AND :date <= m.endDate")
    List<Mission> findMissionByUserBetweenDate(@Param("idUser") Integer idUser, @Param("date")LocalDate date);
}

