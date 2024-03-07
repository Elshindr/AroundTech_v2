package org.elshindr.server_aroundtech.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

/**
 * The type Mission.
 */
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
    @Column(name = "start_date")
    private LocalDate startDate;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "departure_city_id")
    private City departCity;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "arrival_city_id")
    private City arrivalCity;

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

    /**
     * Instantiates a new Mission.
     */
    public Mission(){}


    /**
     * Instantiates a new Mission.
     *
     * @param natureCur   the nature cur
     * @param departCity  the depart city
     * @param arrivalCity the arrival city
     * @param startDate   the start date
     * @param endDate     the end date
     * @param status      the status
     * @param user        the user
     * @param transport   the transport
     * @param natureInit  the nature init
     */
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


    @AssertTrue(message = "La date de début doit être antérieure à la date de fin")
    private boolean isValidDateOrder() {
        return startDate.isBefore(endDate);
    }

    /**
     * Instantiates a new Mission.
     *
     * @param id          the id
     * @param natureCur   the nature cur
     * @param departCity  the depart city
     * @param arrivalCity the arrival city
     * @param startDate   the start date
     * @param endDate     the end date
     * @param status      the status
     * @param user        the user
     * @param transport   the transport
     * @param natureInit  the nature init
     */
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
     * Gets user.
     *
     * @return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * Sets user.
     *
     * @param user the user
     */
    public void setUser(User user) {
        this.user = user;
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
