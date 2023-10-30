package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    @NotNull(message = "El nombre no puede ser nulo")
    private String nombre;
    private String descripcion;
    @Column(nullable = false)
    @NotNull(message = "El estado no puede ser nulo")
    private Boolean activo;
    @OneToMany(mappedBy = "categoria")
    @JsonIgnore
    private List<Producto> productos;
}
