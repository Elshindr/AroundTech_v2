package org.elshindr.server_aroundtech.repositories;

import org.elshindr.server_aroundtech.models.Nature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


/**
 * NatureRepository
 * Interface de récupération des données du model Nature via JPA
 */
public interface NatureRepository extends JpaRepository<Nature, Integer> {

    Optional<Nature> findDistinctById(Integer id);
}

