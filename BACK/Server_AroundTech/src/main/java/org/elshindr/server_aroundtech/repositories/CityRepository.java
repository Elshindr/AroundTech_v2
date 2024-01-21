package org.elshindr.server_aroundtech.repositories;

import org.elshindr.server_aroundtech.models.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Integer> {

    Optional<City> findDistinctById(Integer id);
    Optional<City> findDistinctByName(String name);

}
