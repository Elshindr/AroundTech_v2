package org.elshindr.server_aroundtech.repositories;

import org.elshindr.server_aroundtech.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


/**
 * RoleRepository
 * Interface de récupération des données du model de Role via JPA
 */
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findDistinctById(Integer id);
}