package org.elshindr.server_aroundtech.repositories;

import org.elshindr.server_aroundtech.models.Mission;
import org.elshindr.server_aroundtech.models.Transport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TransportRepository extends JpaRepository<Transport, Integer> {
    Optional<Transport> findDistinctByName(String name);
    Optional<Transport> findDistinctById(Integer id);
}
