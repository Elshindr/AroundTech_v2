package org.elshindr.server_aroundtech.repositories;


import org.elshindr.server_aroundtech.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


/**
 * UserRepository
 * Interface de récupération des données du model User via JPA
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    /**
     * Find distinct by email optional.
     *
     * @param email the email
     * @return the optional
     */
    Optional<User> findDistinctByEmail(String email);

    /**
     * Find distinct by id optional.
     *
     * @param id the id
     * @return the optional
     */
    Optional<User> findDistinctById(Integer id);

    /**
     * Find all managers list.
     *
     * @return the list
     */
    @Query("SELECT u FROM User u WHERE u.role.id = 2")
    List<User> findAllManagers();
}
