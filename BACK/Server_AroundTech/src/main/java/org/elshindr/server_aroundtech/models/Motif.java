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

    public Motif(){
    }

    public Motif(Integer id, String name, @NotNull Boolean isCapped, Float valCap) {
        this.id = id;
        this.name = name;
        this.isCapped = isCapped;
        this.valCap = valCap;
    }
    public Motif(String name, @NotNull Boolean isCapped, Float valCap) {
        this.name = name;
        this.isCapped = isCapped;
        this.valCap = valCap;
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

    public Boolean getCapped() {
        return isCapped;
    }

    public void setCapped(Boolean capped) {
        isCapped = capped;
    }

    public Float getValCap() {
        return valCap;
    }

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
}
