package org.elshindr.server_aroundtech.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


/**
 * The type Status.
 */
@Entity
@Table(name="status")
public class Status {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @NotBlank
        @Column(name = "name")
        private String name;

        /**
         * Instantiates a new Status.
         */
        public Status(){
        }

        /**
         * Instantiates a new Status.
         *
         * @param id   the id
         * @param name the name
         */
        public Status(Integer id, @NotNull String name) {
                this.id = id;
                this.name = name;
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

        @Override
        public String toString() {
                return "Status{" +
                        "id='" + id + '\'' +
                        ", name='" + name + '\'' +
                        '}';
        }
}
