package org.elshindr.server_aroundtech.services;

import org.elshindr.server_aroundtech.models.Transport;
import org.elshindr.server_aroundtech.repositories.MissionRepository;
import org.elshindr.server_aroundtech.repositories.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransportService {

    @Autowired
    private TransportRepository trspRepo;

    public List<Transport> getLstTransports(){
        return this.trspRepo.findAll().stream().toList();
    }
}
