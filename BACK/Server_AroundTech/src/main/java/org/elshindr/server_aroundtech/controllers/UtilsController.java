package org.elshindr.server_aroundtech.controllers;

import org.elshindr.server_aroundtech.dtos.MissionDto;
import org.elshindr.server_aroundtech.models.Transport;
import org.elshindr.server_aroundtech.repositories.UserRepository;
import org.elshindr.server_aroundtech.services.MissionService;
import org.elshindr.server_aroundtech.services.TransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * MissionController
 * Controller des missions
 */
@RestController
@RequestMapping("/transports")
public class UtilsController {


    @Autowired
    private TransportService trsSvc;


    /**
     * Gets lst transports.
     *
     * @return the lst transports
     */
    @GetMapping
    public List<Transport> getLstTransports() {
        return this.trsSvc.getLstTransports();
    }
}
