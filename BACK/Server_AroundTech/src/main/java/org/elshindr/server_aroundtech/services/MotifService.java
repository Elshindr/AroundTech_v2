package org.elshindr.server_aroundtech.services;

import org.apache.commons.lang3.math.NumberUtils;
import org.elshindr.server_aroundtech.models.Motif;
import org.elshindr.server_aroundtech.repositories.MotifRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * The type Motif service.
 */
@Service
public class MotifService {

    @Autowired
    private UserService userSvc;

    @Autowired
    private MotifRepository motRepo;

    /**
     * Find all list.
     *
     * @return the list
     */
    public List<Motif> findAll(){
        return motRepo.findAll();
    }

    /**
     * Create motif boolean.
     *
     * @param jsonMap the json map
     * @return the boolean
     */
    public Boolean createMotif(Map<String, Object> jsonMap){

        try{

            String name = jsonMap.get("name").toString();
            Boolean isCap = Boolean.parseBoolean(jsonMap.get("capped").toString());
            Float valCap = NumberUtils.toFloat(jsonMap.get("valCap").toString(), 0.0f);


            Motif newMotif = new Motif(name, isCap, valCap);
            motRepo.save(newMotif);
            return true;

        } catch(Exception exc){
            return false;
        }

    }

    /**
     * Update motif boolean.
     *
     * @param jsonMap the json map
     * @param idMotif the id motif
     * @return the boolean
     */
    public Boolean updateMotif(Map<String, Object> jsonMap, Integer idMotif) {

        try {
            String name = jsonMap.get("name").toString();
            Boolean isCap = Boolean.parseBoolean(jsonMap.get("capped").toString());
            Float valCap = NumberUtils.toFloat(jsonMap.get("valCap").toString(), 0.0f);

            Motif updMotif = motRepo.findDistinctById(idMotif).get();
            updMotif.setName(name);
            updMotif.setCapped(isCap);
            updMotif.setValCap(valCap);
            motRepo.save(updMotif);

            return true;

        } catch (Exception ex) {
            return false;
        }
    }


    /**
     * Delete motif boolean.
     *
     * @param idMotif the id motif
     * @return the boolean
     */
    public Boolean deleteMotif(Integer idMotif) {

        if (!motRepo.existsById(idMotif)) {
            return false;
        }
        motRepo.deleteById(idMotif);

        return true;
    }


}
