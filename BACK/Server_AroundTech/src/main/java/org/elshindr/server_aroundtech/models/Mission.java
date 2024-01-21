package org.elshindr.server_aroundtech.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name="mission")
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "nature_mission_id")
    private Nature natureCur;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "departure_city_id")
    private City departCity;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "arrival_city_id")
    private City arrivalCity;

    @NotNull
    @Column(name = "start_date")
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date")
    private LocalDate endDate;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "transport_id")
    private Transport transport;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "init_nat_mis_id")
    private Nature natureInit;

    public Mission(){}

    public Mission(Integer id, @NotNull Nature natureCur, @NotNull City departCity, @NotNull City arrivalCity, @NotNull LocalDate startDate, @NotNull LocalDate endDate, @NotNull Status status, @NotNull User user, @NotNull Transport transport, @NotNull Nature natureInit) {
        this.id = id;
        this.natureCur = natureCur;
        this.departCity = departCity;
        this.arrivalCity = arrivalCity;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.user = user;
        this.transport = transport;
        this.natureInit = natureInit;
    }


    public Mission(@NotNull Nature natureCur, @NotNull City departCity, @NotNull City arrivalCity, @NotNull LocalDate startDate, @NotNull LocalDate endDate, @NotNull Status status, @NotNull User user, @NotNull Transport transport, @NotNull Nature natureInit) {
        this.natureCur = natureCur;
        this.departCity = departCity;
        this.arrivalCity = arrivalCity;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.user = user;
        this.transport = transport;
        this.natureInit = natureInit;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
        return "Mission{" +
                "id=" + id +
                ", natureCur=" + natureCur +
                ", departCity=" + departCity +
                ", arrivalCity=" + arrivalCity +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", status=" + status +
                ", user=" + user +
                ", transport=" + transport +
                ", natureInit=" + natureInit +
                '}';
    }
}
