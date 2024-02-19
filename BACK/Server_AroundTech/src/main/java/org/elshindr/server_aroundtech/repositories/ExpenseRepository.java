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

    /**
     * Find distinct by id.
     *
     * @param id the id
     * @return the optional expense
     */
    Optional<Expense> findDistinctById(Integer id);

    /**
     * Find lst expenses by user.
     *
     * @param idUser the id user
     * @return the list
     */
    @Query("SELECT e FROM Expense e WHERE e.mission.user.id = :idUser")
    List<Expense> findLstExpensesByUser(@Param("idUser") Integer idUser);

    /**
     * Find list of expenses by user and mission.
     *
     * @param idUser    the id user
     * @param idMission the id mission
     * @return the list
     */
    @Query("SELECT e FROM Expense e WHERE e.mission.user.id = :idUser And e.mission.id = :idMission")
    List<Expense> findLstExpensesByUserAndMission(@Param("idUser") Integer idUser, @Param("idMission") Integer idMission);
}

