package org.elshindr.server_aroundtech.dtos;

import org.elshindr.server_aroundtech.models.*;

import java.time.LocalDate;

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


    public MissionDto(){}

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

    public static Mission parseMissionDtoToMission(MissionDto missionDto){
        return new Mission();
    }

    public static MissionDto parseMissionToMissionDto(Mission mission){
        return new MissionDto(mission.getId(), mission.getNatureCur(), mission.getDepartCity(), mission.getArrivalCity(), mission.getStartDate(), mission.getEndDate(), mission.getStatus(), mission.getUser().getId(), mission.getTransport(), mission.getNatureInit());
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Nature getNatureCur() {
        return natureCur;
    }

    public void setNatureCur(Nature natureCur) {
        this.natureCur = natureCur;
    }

    public City getDepartCity() {
        return departCity;
    }

    public void setDepartCity(City departCity) {
        this.departCity = departCity;
    }

    public City getArrivalCity() {
        return arrivalCity;
    }

    public void setArrivalCity(City arrivalCity) {
        this.arrivalCity = arrivalCity;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Transport getTransport() {
        return transport;
    }

    public void setTransport(Transport transport) {
        this.transport = transport;
    }

    public Nature getNatureInit() {
        return natureInit;
    }

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
