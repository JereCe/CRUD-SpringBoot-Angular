package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Producto {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;
        private String codigo;
        @Column(nullable = false)
        @NotNull(message = "El nombre no puede ser nulo")
        private String nombre;
        @Column(nullable = false)
        @NotNull(message = "el precio no puede ser nulo")
        private Float precioVenta;
        @Column(nullable = false)
        @NotNull(message = "el stock no puede ser nulo")
        private Integer stock;
        private String descripcion;
        private String imagen;
        @Column(nullable = false)
        @NotNull(message = "el campo activo no puede ser nulo")
        private Boolean activo;
        @ManyToOne
        @JoinColumn(name ="categoria_id" )
        private Categoria categoria;

}
