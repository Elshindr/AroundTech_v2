package org.elshindr.server_aroundtech.services;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.apache.commons.lang3.math.NumberUtils;
import org.elshindr.server_aroundtech.models.Nature;
import org.elshindr.server_aroundtech.repositories.NatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

/**
 * The type Nature service.
 */
@Service
public class NatureService {

    @Autowired
    private UserService userSvc;

    @Autowired
    private NatureRepository natRepo;

    /**
     * Find all list.
     *
     * @return the list
     */
    public List<Nature> findAll() {
        return natRepo.findAll();
    }

    /**
     * Find one nature.
     *
     * @param idNature the id nature
     * @return the nature
     */
    public Nature findOne(Integer idNature) {
        return natRepo.findDistinctById(idNature).get();
    }

    /**
     * Find nature by date list.
     *
     * @param date the date
     * @return the list
     */
    public List<Nature> findNatureByDate(LocalDate date){
        if(date == null){
            return this.natRepo.findAll().stream().toList();
        }
        System.out.println("date pas null");
       return this.natRepo.findNatureByDate(date);
    }

    /**
     * Create nature boolean.
     *
     * @param jsonMap the json map
     * @return the boolean
     */
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

    /**
     * Update nature boolean.
     *
     * @param jsonMap  the json map
     * @param idNature the id nature
     * @return the boolean
     */
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

    /**
     * Delete nature boolean.
     *
     * @param idNature the id nature
     * @return the boolean
     */
    public Boolean deleteNature(Integer idNature) {

        if (!natRepo.existsById(idNature)) {
            return false;
        }
        natRepo.deleteById(idNature);

        return true;
    }
}
