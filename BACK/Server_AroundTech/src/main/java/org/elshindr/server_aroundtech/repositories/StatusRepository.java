package org.elshindr.server_aroundtech.repositories;

import org.elshindr.server_aroundtech.models.Motif;
import org.elshindr.server_aroundtech.models.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


/**
 * MotifRepository
 * Interface de récupération des données du model Motif via JPA
 */
public interface StatusRepository extends JpaRepository<Status, Integer> {

    /**
     * Find distinct by id optional.
     *
     * @param id the id
     * @return the optional
     */
    Optional<Status> findDistinctById(Integer id);

}
