package org.elshindr.server_aroundtech.repositories;

import org.elshindr.server_aroundtech.models.Expense;
import org.elshindr.server_aroundtech.models.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


/**
 * ExpenseRepository
 * Interface de récupération des données du model Expense via JPA
 */
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    Optional<Expense> findDistinctByMission(Mission mission);
    Optional<Expense> findDistinctById(Integer id);

    @Query("SELECT e FROM Expense e WHERE e.mission.user.id = :idUser")
    List<Expense> findLstExpensesByUser(@Param("idUser") Integer idUser);

    @Query("SELECT e FROM Expense e WHERE e.mission.user.id = :idUser And e.mission.id = :idMission")
    List<Expense> findLstExpensesByUserAndMission(@Param("idUser") Integer idUser, @Param("idMission") Integer idMission);
}

