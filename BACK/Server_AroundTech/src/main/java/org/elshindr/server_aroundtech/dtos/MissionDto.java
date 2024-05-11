package org.elshindr.server_aroundtech.dtos;


import org.elshindr.server_aroundtech.models.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.chrono.ChronoLocalDate;
import java.time.temporal.TemporalAccessor;
import java.util.List;
import java.util.Objects;

/**
 * The type Mission dto.
 */
public class MissionDto {

    private Integer id;
    private Nature natureCur;
    private City departCity;
    private City arrivalCity;
    private LocalDate startDate;
    private LocalDate endDate;
    private Status status;
    private Integer userId;
    private Transport transport;
    private Nature natureInit;
    private BigDecimal totalExpenses;
    private boolean editable;


    /**
     * Instantiates a new Mission dto.
     */
    public MissionDto(){}


    public MissionDto(Mission mission, BigDecimal totalExpenses) {
        this.id = mission.getId();
        this.natureCur = mission.getNatureCur();
        this.departCity = mission.getDepartCity();
        this.arrivalCity = mission.getArrivalCity();
        this.startDate = mission.getStartDate();
        this.endDate = mission.getEndDate();
        this.status = mission.getStatus();
        this.userId = mission.getUser().getId();
        this.transport = mission.getTransport();
        this.natureInit = mission.getNatureInit();

        /* les boutons s'affichent si:
        * - date de fin < à date du jour alors
        * - status = En attente
        * */
        //System.out.println(status.getId());

        this.editable = endDate.isBefore(LocalDate.now()) || status.getId() == 2;
        this.totalExpenses = totalExpenses;
    }


    /**
     * Parse mission dto to mission .
     *
     * @param missionDto the mission dto
     * @return the mission
     */
    public static Mission parseMissionDtoToMission(MissionDto missionDto){
        return new Mission();
    }


    public static BigDecimal calculateTotalExpenses(Mission mission, List<Expense> lstExpenses) {


        return lstExpenses.stream().map(expense -> {
            //System.out.println(expense.getAmount());
            return expense.getAmount();
        }).reduce(BigDecimal.ZERO, (a, b) -> a.add(b));

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
     * Gets nature cur.
     *
     * @return the nature cur
     */
    public Nature getNatureCur() {
        return natureCur;
    }

    /**
     * Sets nature cur.
     *
     * @param natureCur the nature cur
     */
    public void setNatureCur(Nature natureCur) {
        this.natureCur = natureCur;
    }

    /**
     * Gets depart city.
     *
     * @return the depart city
     */
    public City getDepartCity() {
        return departCity;
    }

    /**
     * Sets depart city.
     *
     * @param departCity the departure city
     */
    public void setDepartCity(City departCity) {
        this.departCity = departCity;
    }

    /**
     * Gets arrival city.
     *
     * @return the arrival city
     */
    public City getArrivalCity() {
        return arrivalCity;
    }

    /**
     * Sets arrival city.
     *
     * @param arrivalCity the arrival city
     */
    public void setArrivalCity(City arrivalCity) {
        this.arrivalCity = arrivalCity;
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

    /**
     * Gets status.
     *
     * @return the status
     */
    public Status getStatus() {
        return status;
    }

    /**
     * Sets status.
     *
     * @param status the status
     */
    public void setStatus(Status status) {
        this.status = status;
    }

    /**
     * Gets user id.
     *
     * @return the user id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * Sets user id.
     *
     * @param userId the user id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * Gets transport.
     *
     * @return the transport
     */
    public Transport getTransport() {
        return transport;
    }

    /**
     * Sets transport.
     *
     * @param transport the transport
     */
    public void setTransport(Transport transport) {
        this.transport = transport;
    }

    /**
     * Gets nature init.
     *
     * @return the nature init
     */
    public Nature getNatureInit() {
        return natureInit;
    }

    /**
     * Sets nature init.
     *
     * @param natureInit the nature init
     */
    public void setNatureInit(Nature natureInit) {
        this.natureInit = natureInit;
    }


    public BigDecimal getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(BigDecimal totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public boolean isEditable() {
        return editable;
    }

    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    @Override
    public String toString() {
        return "MissionDto{" +
                "id=" + id +
                ", natureCur=" + natureCur +
                ", departCity=" + departCity +
                ", arrivalCity=" + arrivalCity +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", status=" + status +
                ", userId=" + userId +
                ", transport=" + transport +
                ", natureInit=" + natureInit +
                ", totalExpenses=" + totalExpenses +
                ", editable=" + editable +
                '}';
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MissionDto that = (MissionDto) o;
        return isEditable() == that.isEditable() && Objects.equals(getId(), that.getId()) && Objects.equals(getNatureCur().getId(), that.getNatureCur().getId()) && Objects.equals(getDepartCity().getId(), that.getDepartCity().getId()) && Objects.equals(getArrivalCity().getId(), that.getArrivalCity().getId()) && Objects.equals(getStartDate(), that.getStartDate()) && Objects.equals(getEndDate(), that.getEndDate()) && Objects.equals(getStatus().getId(), that.getStatus().getId()) && Objects.equals(getUserId(), that.getUserId()) && Objects.equals(getTransport().getId(), that.getTransport().getId()) && Objects.equals(getNatureInit().getId(), that.getNatureInit().getId()) && Objects.equals(getTotalExpenses(), that.getTotalExpenses());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNatureCur(), getDepartCity(), getArrivalCity(), getStartDate(), getEndDate(), getStatus(), getUserId(), getTransport(), getNatureInit(), getTotalExpenses(), isEditable());
    }
}
