package org.elshindr.server_aroundtech.services;

import org.elshindr.server_aroundtech.models.Transport;
import org.elshindr.server_aroundtech.repositories.MissionRepository;
import org.elshindr.server_aroundtech.repositories.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * The type Transport service.
 */
@Service
public class TransportService {

    @Autowired
    private TransportRepository trspRepo;

    /**
     * Get lst transports list.
     *
     * @return the list
     */
    public List<Transport> getLstTransports(){
        return this.trspRepo.findAll().stream().toList();
    }

    /**
     * Get distinct transport by id optional.
     *
     * @param idTransport the id transport
     * @return the optional
     */
    public Optional<Transport> getDistinctTransportById(Integer idTransport){
        return this.trspRepo.findDistinctById(idTransport);
    }
}
