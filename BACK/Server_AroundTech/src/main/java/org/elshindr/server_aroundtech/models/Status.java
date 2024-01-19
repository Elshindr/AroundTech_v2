package org.elshindr.server_aroundtech.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name="status")
public class Status {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @NotBlank
        @Column(name = "name")
        private String name;

        public Status(){
        }

        public Status(Integer id, @NotNull String name) {
                this.id = id;
                this.name = name;
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

        @Override
        public String toString() {
                return "Status{" +
                        "id='" + id + '\'' +
                        ", name='" + name + '\'' +
                        '}';
        }
}
