package org.elshindr.server_aroundtech.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "nature_mission")
public class Nature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "is_charge")
    private Boolean isCharge;

    @NotNull
    @Column(name = "is_bonus")
    private Boolean isBonus;

    @Column(name = "tjm")
    private Float tjm;

    @Column(name = "percentage")
    private Float percentage;

    @NotNull
    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    public Nature(){
    }

    public Nature(Integer id, @NotNull String name, @NotNull Boolean isCharge, @NotNull Boolean isBonus,  Float tjm, Float percentage, @NotNull LocalDate startDate, LocalDate endDate) {
        this.id = id;
        this.name = name;
        this.isCharge = isCharge;
        this.isBonus = isBonus;
        this.tjm = tjm;
        this.percentage = percentage;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Nature(@NotNull String name, @NotNull Boolean isCharge, @NotNull Boolean isBonus, Float tjm, Float percentage, @NotNull LocalDate startDate, LocalDate endDate) {
        this.name = name;
        this.isCharge = isCharge;
        this.isBonus = isBonus;
        this.tjm = tjm;
        this.percentage = percentage;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getCharge() {
        return isCharge;
    }

    public void setCharge(Boolean charge) {
        isCharge = charge;
    }

    public Boolean getBonus() {
        return isBonus;
    }

    public void setBonus(Boolean bonus) {
        isBonus = bonus;
    }

    public Float getTjm() {
        return tjm;
    }

    public void setTjm(Float tjm) {
        this.tjm = tjm;
    }

    public Float getPercentage() {
        return percentage;
    }

    public void setPercentage(Float percentage) {
        this.percentage = percentage;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "Nature{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", isCharge=" + isCharge +
                ", isBonus=" + isBonus +
                ", tjm=" + tjm +
                ", percentage=" + percentage +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
