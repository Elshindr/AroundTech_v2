package org.elshindr.server_aroundtech.repositories;

import org.elshindr.server_aroundtech.models.Transport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * The interface Transport repository.
 */
public interface TransportRepository extends JpaRepository<Transport, Integer> {
    /**
     * Find distinct by name optional.
     *
     * @param name the name
     * @return the optional
     */
    Optional<Transport> findDistinctByName(String name);

    /**
     * Find distinct by id optional.
     *
     * @param id the id
     * @return the optional
     */
    Optional<Transport> findDistinctById(Integer id);
}
