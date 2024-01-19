package org.elshindr.server_aroundtech.controllers;

import org.elshindr.server_aroundtech.models.Expense;
import org.elshindr.server_aroundtech.repositories.UserRepository;
import org.elshindr.server_aroundtech.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * ExpenseController
 * Controller des notes de frais
 */
@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ExpenseService expSvc;


    @GetMapping("{idUser}")
    public List<Expense> getlstExpenseByUser(@PathVariable Integer idUser) {
        // Récupérer les informations de l'utilisateur à partir de l'objet Authentication
        //System.out.println(authentication.getPrincipal().toString());
        // UserDto userDto = (UserDto) ;
        //return ResponseEntity.ok(userDto);

        return this.expSvc.getAllByUser(idUser);

    }


    @GetMapping("{idUser}/{idMission}")
    public List<Expense> getOneExpenseByUserAndMission(@PathVariable Integer idUser, @PathVariable Integer idMission) {
        return this.expSvc.getLstExpensesByUserAndMission(idUser, idMission);
    }


    @PostMapping
    public ResponseEntity<?> createExpense(@RequestBody Map<String, Object> jsonMap) {
        System.out.println(jsonMap);
       if(this.expSvc.createExpense(jsonMap)){
           return ResponseEntity.ok().body("");
       }

        return ResponseEntity.badRequest().body("");
    }

    @PutMapping("{idExpense}")
    public ResponseEntity<?> updateExpense(@PathVariable Integer idExpense, @RequestBody Map<String, Object> jsonMap) {
        if(this.expSvc.updateExpense(jsonMap, idExpense)){
            return ResponseEntity.ok().body("");
        }
        return ResponseEntity.badRequest().body("");
    }

    @DeleteMapping("{idExpense}")
    public ResponseEntity<?> deleteExpense(@PathVariable Integer idExpense){
        if (this.expSvc.deleteExpense(idExpense)){
            return ResponseEntity.ok().body("");
        }
        return ResponseEntity.badRequest().body("");
    }


    @PutMapping("valid/{idMission}")
    public ResponseEntity<?> updateValidAtExpense(@PathVariable Integer idMission, @RequestBody Map<String, Object> jsonMap) {
        if(this.expSvc.updateValidAtExpense(jsonMap, idMission)){
            return ResponseEntity.ok().body("");
        }
        return ResponseEntity.badRequest().body("");
    }
}
