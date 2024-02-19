package org.elshindr.server_aroundtech.dtos;

import org.elshindr.server_aroundtech.models.*;

import java.time.LocalDate;

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


    /**
     * Instantiates a new Mission dto.
     */
    public MissionDto(){}

    /**
     * Instantiates a new Mission dto.
     *
     * @param id          the id
     * @param natureCur   the nature cur
     * @param departCity  the depart city
     * @param arrivalCity the arrival city
     * @param startDate   the start date
     * @param endDate     the end date
     * @param status      the status
     * @param userId      the user id
     * @param transport   the transport
     * @param natureInit  the nature init
     */
    public MissionDto(Integer id, Nature natureCur, City departCity, City arrivalCity, LocalDate startDate, LocalDate endDate, Status status, Integer userId, Transport transport, Nature natureInit) {
        this.id = id;
        this.natureCur = natureCur;
        this.departCity = departCity;
        this.arrivalCity = arrivalCity;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.userId = userId;
        this.transport = transport;
        this.natureInit = natureInit;
    }

    /**
     * Instantiates a new Mission dto.
     *
     * @param natureCur   the nature cur
     * @param departCity  the depart city
     * @param arrivalCity the arrival city
     * @param startDate   the start date
     * @param endDate     the end date
     * @param status      the status
     * @param userId      the user id
     * @param transport   the transport
     * @param natureInit  the nature init
     */
    public MissionDto(Nature natureCur, City departCity, City arrivalCity, LocalDate startDate, LocalDate endDate, Status status, Integer userId, Transport transport, Nature natureInit) {
        this.natureCur = natureCur;
        this.departCity = departCity;
        this.arrivalCity = arrivalCity;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.userId = userId;
        this.transport = transport;
        this.natureInit = natureInit;
    }

    /**
     * Parse mission dto to mission mission.
     *
     * @param missionDto the mission dto
     * @return the mission
     */
    public static Mission parseMissionDtoToMission(MissionDto missionDto){
        return new Mission();
    }

    /**
     * Parse mission to mission dto mission dto.
     *
     * @param mission the mission
     * @return the mission dto
     */
    public static MissionDto parseMissionToMissionDto(Mission mission){
        return new MissionDto(mission.getId(), mission.getNatureCur(), mission.getDepartCity(), mission.getArrivalCity(), mission.getStartDate(), mission.getEndDate(), mission.getStatus(), mission.getUser().getId(), mission.getTransport(), mission.getNatureInit());
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
     * @param departCity the depart city
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
                '}';
    }
}
