package org.elshindr.server_aroundtech.services;

import org.apache.commons.lang3.math.NumberUtils;
import org.elshindr.server_aroundtech.exceptions.EntityNotFoundException;
import org.elshindr.server_aroundtech.models.Expense;
import org.elshindr.server_aroundtech.models.Mission;
import org.elshindr.server_aroundtech.models.Motif;
import org.elshindr.server_aroundtech.repositories.ExpenseRepository;
import org.elshindr.server_aroundtech.repositories.MissionRepository;
import org.elshindr.server_aroundtech.repositories.MotifRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

/**
 * The type Expense service.
 */
@Service
public class ExpenseService {

    @Autowired
    private UserService userService;
    @Autowired
    private ExpenseRepository expRepo;
    @Autowired
    private MissionRepository misRepo;
    @Autowired
    private MotifRepository motifRepo;

    /**
     * Gets all by user.
     *
     * @param idUser the id user
     * @return the all by user
     */
    public List<Expense> getAllByUser(Integer idUser) {
        return expRepo.findLstExpensesByUser(idUser);
    }

    /**
     * Gets lst expenses by user and mission.
     *
     * @param idUser    the id user
     * @param idMission the id mission
     * @return the lst expenses by user and mission
     */
    public List<Expense> getLstExpensesByUserAndMission(Integer idUser, Integer idMission) {
        return expRepo.findLstExpensesByUserAndMission(idUser, idMission);
    }

    /**
     * Create expense boolean.
     *
     * @param jsonMap the json map
     * @return the boolean
     */
    public Boolean createExpense(Map<String, Object> jsonMap) throws Exception{

        try{
            Integer idMotif = NumberUtils.toInt(jsonMap.get("idMotif").toString(), 0);
            Integer idMission = NumberUtils.toInt(jsonMap.get("idMission").toString(), 0);
            Float amount = NumberUtils.toFloat(jsonMap.get("amount").toString(), 0.0f);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime createdAt = LocalDateTime.parse((String) jsonMap.get("createdAt"), formatter);
            LocalDate date = createdAt.toLocalDate();

            Mission mission = misRepo.findDistinctById(idMission).orElseThrow(EntityNotFoundException::new);
            Motif motif = motifRepo.findDistinctById(idMotif).orElseThrow(EntityNotFoundException::new);

            boolean expenseExists = expRepo.existsByCreatedAtAndMotifAndMission(date, motif, mission);
            if (expenseExists) {
                throw new Exception("Couple Date - Motif déjà présent pour cette mission");
            }

            Expense newExpense = new Expense(amount, date, null, mission, motif);
            expRepo.save(newExpense);

            return true;

        } catch (Exception e){
            throw new Exception("Erreur création une note de frais: "+e);
        }
    }

    /**
     * Update expense boolean.
     *
     * @param jsonMap   the json map
     * @param idExpense the id expense
     * @return the boolean
     */
    public Boolean updateExpense(Map<String, Object> jsonMap, Integer idExpense) {

        try {
            Integer idMotif = NumberUtils.toInt(jsonMap.get("idMotif").toString(), 0);
            Float amount = NumberUtils.toFloat(jsonMap.get("amount").toString(), 0.0f);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime createdAt = LocalDateTime.parse((String) jsonMap.get("createdAt"), formatter);
            LocalDate dateCreate = createdAt.toLocalDate();

            LocalDate dateValid = null;
            if (jsonMap.get("validAt") != null) {
                LocalDateTime validAt = LocalDateTime.parse((String) jsonMap.get("validAt"), formatter);
                dateValid = validAt.toLocalDate();
            }

            Motif motif = motifRepo.findDistinctById(idMotif).get();
            Expense updExpense = expRepo.findDistinctById(idExpense).get();
            Mission mission = updExpense.getMission();


            updExpense.setAmount(amount);
            updExpense.setCreatedAt(dateCreate);
            updExpense.setValidAt(dateValid);
            updExpense.setMission(mission);
            updExpense.setMotif(motif);

            expRepo.save(updExpense);

            return true;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            System.out.println(ex);
            return false;
        }
    }

    /**
     * Delete expense boolean.
     *
     * @param idExpense the id expense
     * @return the boolean
     */
    public Boolean deleteExpense(Integer idExpense) {

        if (!expRepo.existsById(idExpense)) {
            return false;
        }
        expRepo.deleteById(idExpense);

        return true;
    }

    /**
     * Update valid at expense boolean.
     *
     * @param jsonMap   the json map
     * @param idMission the id mission
     * @return the boolean
     */
    public Boolean updateValidAtExpense(Map<String, Object> jsonMap, Integer idMission){
        try {

            Integer idUser = NumberUtils.toInt(jsonMap.get("idUser").toString(), 0);
            List<Expense> lstExpenses = this.expRepo.findLstExpensesByUserAndMission(idUser, idMission);

            if (lstExpenses.get(0).getValidAt() != null) {
                throw new IllegalStateException("La date de validité ne peut pas être modifiée une fois définie.");
            }

            LocalDate dateValid = LocalDate.now();
            if (jsonMap.get("validAt") != null) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                LocalDateTime validAt = LocalDateTime.parse((String) jsonMap.get("validAt"), formatter);
                dateValid = validAt.toLocalDate();
            }

            for (Expense exp :lstExpenses) {
                exp.setValidAt(dateValid);
                this.expRepo.save(exp);
            }

            return true;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            System.out.println(ex);
            return false;
        }
    }
}
