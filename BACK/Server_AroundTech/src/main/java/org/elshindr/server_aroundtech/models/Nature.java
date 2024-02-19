package org.elshindr.server_aroundtech.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Date;

/**
 * The type Nature.
 */
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

    /**
     * Instantiates a new Nature.
     */
    public Nature(){
    }

    /**
     * Instantiates a new Nature.
     *
     * @param id         the id
     * @param name       the name
     * @param isCharge   the is charge
     * @param isBonus    the is bonus
     * @param tjm        the tjm
     * @param percentage the percentage
     * @param startDate  the start date
     * @param endDate    the end date
     */
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

    /**
     * Instantiates a new Nature.
     *
     * @param name       the name
     * @param isCharge   the is charge
     * @param isBonus    the is bonus
     * @param tjm        the tjm
     * @param percentage the percentage
     * @param startDate  the start date
     * @param endDate    the end date
     */
    public Nature(@NotNull String name, @NotNull Boolean isCharge, @NotNull Boolean isBonus, Float tjm, Float percentage, @NotNull LocalDate startDate, LocalDate endDate) {
        this.name = name;
        this.isCharge = isCharge;
        this.isBonus = isBonus;
        this.tjm = tjm;
        this.percentage = percentage;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    /**
     * Gets id.
     *
     * @return the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets id.
     *
     * @param id the id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name.
     *
     * @param name the name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets charge.
     *
     * @return the charge
     */
    public Boolean getCharge() {
        return isCharge;
    }

    /**
     * Sets charge.
     *
     * @param charge the charge
     */
    public void setCharge(Boolean charge) {
        isCharge = charge;
    }

    /**
     * Gets bonus.
     *
     * @return the bonus
     */
    public Boolean getBonus() {
        return isBonus;
    }

    /**
     * Sets bonus.
     *
     * @param bonus the bonus
     */
    public void setBonus(Boolean bonus) {
        isBonus = bonus;
    }

    /**
     * Gets tjm.
     *
     * @return the tjm
     */
    public Float getTjm() {
        return tjm;
    }

    /**
     * Sets tjm.
     *
     * @param tjm the tjm
     */
    public void setTjm(Float tjm) {
        this.tjm = tjm;
    }

    /**
     * Gets percentage.
     *
     * @return the percentage
     */
    public Float getPercentage() {
        return percentage;
    }

    /**
     * Sets percentage.
     *
     * @param percentage the percentage
     */
    public void setPercentage(Float percentage) {
        this.percentage = percentage;
    }

    /**
     * Gets start date.
     *
     * @return the start date
     */
    public LocalDate getStartDate() {
        return startDate;
    }

    /**
     * Sets start date.
     *
     * @param startDate the start date
     */
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    /**
     * Gets end date.
     *
     * @return the end date
     */
    public LocalDate getEndDate() {
        return endDate;
    }

    /**
     * Sets end date.
     *
     * @param endDate the end date
     */
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
