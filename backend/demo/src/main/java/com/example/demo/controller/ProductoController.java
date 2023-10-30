package com.example.demo.controller;

import com.example.demo.model.Categoria;
import com.example.demo.model.Producto;
import com.example.demo.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping("/producto")
@CrossOrigin("*")
public class ProductoController {

    @Autowired
    private ProductoService ps;

    @GetMapping("")
    public ResponseEntity<List<Producto>> getAll() {
        return ps.getAll();
    }

    @PostMapping("")
    public ResponseEntity add(@RequestBody @NotNull final Producto p){
        return ps.add(p);
    }

    @PostMapping("/{id}/update")
    public ResponseEntity update(@PathVariable @NotNull final Integer id, @RequestBody @NotNull final Producto p){
        return ps.update(id,p);
    }

    @PostMapping("/{id}/delete")
    public ResponseEntity delete(@PathVariable @NotNull final Integer id){
        return ps.delete(id);
    }

    @PostMapping("/{id}/cambiarestado")
    public ResponseEntity CambiarEstado(@PathVariable @NotNull final Integer id){
        return ps.cambiarEstado(id);
    }



}
