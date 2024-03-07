package org.elshindr.server_aroundtech.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

/**
 * Expense
 * Modele de note de frais (JPA)
 */
@Entity
@Table(name="expense_report")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Min(value = 1, message = "La valeur doit être supérieure à 0")
    @Column(name = "amount")
    private float amount;

    @NotNull
    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "valid_at")
    private LocalDate validAt;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "nature_expense_id")
    private Motif motif;

    @AssertTrue(message = "La date de validation doit être supérieure à la date de création")
    private boolean isDateFinSuperieure() {
        return validAt == null || validAt.isAfter(createdAt);
    }

    public Expense(){
    }
     public Expense(@NotNull float amount, @NotNull LocalDate createdAt, LocalDate validAt, @NotNull Mission mission, @NotNull Motif motif) {
        this.amount = amount;
        this.createdAt = createdAt;
        this.validAt = validAt;
        this.mission = mission;
        this.motif = motif;

        this.isDateFinSuperieure();
    }

    @PreUpdate
    private void preUpdate() {
        if (validAt != null) {
            throw new IllegalStateException("La date de validité ne peut pas être modifiée une fois définie.");
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getValidAt() {
        return validAt;
    }

    public void setValidAt(LocalDate validAt) {
        this.validAt = validAt;
    }

    public Mission getMission() {
        return mission;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }

    public Motif getMotif() {
        return motif;
    }

    public void setMotif(Motif motif) {
        this.motif = motif;
    }
    public Expense(Integer id, @NotNull float amount, @NotNull LocalDate createdAt, LocalDate validAt, @NotNull Mission mission, @NotNull Motif motif) {
        this.id = id;
        this.amount = amount;
        this.createdAt = createdAt;
        this.validAt = validAt;
        this.mission = mission;
        this.motif = motif;
    }


    @Override
    public String toString() {
        return "Expense{" +
                "id=" + id +
                ", amount=" + amount +
                ", createdAt=" + createdAt +
                ", validAt=" + validAt +
                ", mission=" + mission +
                ", motif=" + motif +
                '}';
    }
}
