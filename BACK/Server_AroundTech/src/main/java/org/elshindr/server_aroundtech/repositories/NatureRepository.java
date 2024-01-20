package org.elshindr.server_aroundtech.repositories;

import org.elshindr.server_aroundtech.models.Nature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


/**
 * NatureRepository
 * Interface de récupération des données du model Nature via JPA
 */
public interface NatureRepository extends JpaRepository<Nature, Integer> {

    Optional<Nature> findDistinctById(Integer id);


    @Query("SELECT n FROM Nature n " +
            "WHERE (n.endDate IS NOT NULL AND :targetDate BETWEEN n.startDate AND n.endDate) " +
            "OR (n.endDate IS NULL AND :targetDate >= n.startDate)")
    List<Nature> findNatureByDate(@Param("targetDate") LocalDate targetDate);



}

