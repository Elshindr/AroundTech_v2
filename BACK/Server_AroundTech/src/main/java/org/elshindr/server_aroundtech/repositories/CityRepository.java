package org.elshindr.server_aroundtech.repositories;

import org.elshindr.server_aroundtech.models.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * The interface City repository.
 */
public interface CityRepository extends JpaRepository<City, Integer> {

    /**
     * Find distinct by id optional.
     *
     * @param id the id
     * @return the optional
     */
    Optional<City> findDistinctById(Integer id);

    /**
     * Find distinct by name optional.
     *
     * @param name the name
     * @return the optional
     */
    Optional<City> findDistinctByName(String name);

}
