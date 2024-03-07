package org.elshindr.server_aroundtech.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Motif
 * Modele d'une nature de frais (JPA)
 */
@Entity
@Table(name="nature_expense")
public class Motif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank // ni null, ni vide, ni espace vide
    @Size(max = 50)
    @Column(name="name")
    private String name;

    @NotNull
    @Column(name="is_capped")
    private Boolean isCapped;

    @NotNull
    @Column(name="cap_value")
    private Float valCap;

    /**
     * Instantiates a new Motif.
     */
    public Motif(){
    }


    /**
     * Instantiates a new Motif.
     *
     * @param name     the name
     * @param isCapped the is capped
     * @param valCap   the val cap
     */
    public Motif(@NotBlank String name, @NotNull Boolean isCapped, @NotNull Float valCap) {
        this.name = name;
        this.isCapped = isCapped;
        this.valCap = valCap;
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
     * Gets capped.
     *
     * @return the capped
     */
    public Boolean getCapped() {
        return isCapped;
    }

    /**
     * Sets capped.
     *
     * @param capped the capped
     */
    public void setCapped(Boolean capped) {
        isCapped = capped;
    }

    /**
     * Gets val cap.
     *
     * @return the val cap
     */
    public Float getValCap() {
        return valCap;
    }

    /**
     * Sets val cap.
     *
     * @param valCap the val cap
     */
    public void setValCap(Float valCap) {
        this.valCap = valCap;
    }

    @Override
    public String toString() {
        return "Motif{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isCapped=" + isCapped +
                ", valCap=" + valCap +
                '}';
    }

    /**
     * Instantiates a new Motif.
     *
     * @param id       the id
     * @param name     the name
     * @param isCapped the is capped
     * @param valCap   the val cap
     */
    public Motif(Integer id, String name, @NotNull Boolean isCapped, Float valCap) {
        this.id = id;
        this.name = name;
        this.isCapped = isCapped;
        this.valCap = valCap;
    }

}
