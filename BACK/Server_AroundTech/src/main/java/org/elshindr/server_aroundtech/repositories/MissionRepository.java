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

    /**
     * Find distinct mission by user.
     *
     * @param user the user
     * @return the optional mission
     */
    Optional<Mission> findDistinctByUser(User user);

    /**
     * Find distinct by id.
     *
     * @param id the id
     * @return the optional mission
     */
    Optional<Mission> findDistinctById(Integer id);

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
     *
     * @param idUser the id user
     * @param date   the date
     * @return the list
     */
    @Query("SELECT m FROM Mission m WHERE m.user.id = :idUser AND m.startDate <= :date AND :date <= m.endDate")
    List<Mission> findMissionByUserBetweenDate(@Param("idUser") Integer idUser, @Param("date")LocalDate date);
}

