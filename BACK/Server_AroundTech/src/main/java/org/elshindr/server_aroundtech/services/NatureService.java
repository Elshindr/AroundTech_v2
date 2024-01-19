package org.elshindr.server_aroundtech.services;

import org.apache.commons.lang3.math.NumberUtils;
import org.elshindr.server_aroundtech.models.Nature;
import org.elshindr.server_aroundtech.repositories.NatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class NatureService {

    @Autowired
    private UserService userSvc;

    @Autowired
    private NatureRepository natRepo;

    public List<Nature> findAll() {
        return natRepo.findAll();
    }

    public Nature findOne(Integer idNature) {
        return natRepo.findDistinctById(idNature).get();
    }

    public Boolean createNature(Map<String, Object> jsonMap) {
        try {
            String name = jsonMap.get("name").toString();
            Boolean isCharge = (Boolean) jsonMap.get("charge");
            Boolean isBonus = (Boolean) jsonMap.get("bonus");

            Float tjm = null;
            if (jsonMap.get("tjm") != null) {
                tjm = NumberUtils.toFloat(jsonMap.get("tjm").toString(), 0.0f);
            }
            Float percentage = null;
            if (jsonMap.get("percentage") != null) {
                percentage = NumberUtils.toFloat(jsonMap.get("percentage").toString(), 0.0f);
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            LocalDate startDate = LocalDate.parse((String) jsonMap.get("startDate"), formatter);

            LocalDate endDate = null;
            if (jsonMap.get("endDate") != null) {
                 endDate = LocalDate.parse((String) jsonMap.get("endDate"), formatter);
            }

            Nature newNature = new Nature(name, isCharge, isBonus, tjm, percentage, startDate, endDate);
            natRepo.save(newNature);

            return true;

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return false;
        }
    }

    public Boolean updateNature(Map<String, Object> jsonMap, Integer idNature) {
        try {
            String name = jsonMap.get("name").toString();
            Boolean isCharge = (Boolean) jsonMap.get("charge");
            Boolean isBonus = (Boolean) jsonMap.get("bonus");

            Float tjm = null;
            if (jsonMap.get("tjm") != null) {
                tjm = NumberUtils.toFloat(jsonMap.get("tjm").toString(), 0.0f);
            }
            Float percentage = null;
            if (jsonMap.get("percentage") != null) {
                percentage = NumberUtils.toFloat(jsonMap.get("percentage").toString(), 0.0f);
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate startDate = LocalDate.parse((String) jsonMap.get("startDate"), formatter);

            LocalDate endDate = null;
            if (jsonMap.get("endDate") != null) {
                endDate = LocalDate.parse((String) jsonMap.get("endDate"), formatter);

            }

            Nature updNature = natRepo.findDistinctById(idNature).get();

            updNature.setName(name);
            updNature.setBonus(isBonus);
            updNature.setCharge(isCharge);
            updNature.setPercentage(percentage);
            updNature.setTjm(tjm);
            updNature.setEndDate(endDate);
            updNature.setStartDate(startDate);

            natRepo.save(updNature);

            return true;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return false;
        }
    }

    public Boolean deleteNature(Integer idNature) {

        if (!natRepo.existsById(idNature)) {
            return false;
        }
        natRepo.deleteById(idNature);

        return true;
    }
}
