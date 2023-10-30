package com.example.demo.controller;

import com.example.demo.model.Categoria;
import com.example.demo.model.Producto;
import com.example.demo.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
@RestController
@RequestMapping("/categoria")
@CrossOrigin("*")
public class CategoriaController {

    @Autowired
    private CategoriaService cs;

    @GetMapping("")
    public ResponseEntity<List<Categoria>> getAll() {
        return cs.getAll();
    }

    @PostMapping("")
    public ResponseEntity add(@RequestBody @NotNull final Categoria c) {
        return cs.add(c);

    }

    @PostMapping("/{id}/update")
    public ResponseEntity update(@PathVariable @NotNull final Integer id, @RequestBody @NotNull final Categoria c) {
        return cs.update(id, c);
    }

    @PostMapping("/{id}/delete")
    public ResponseEntity delete(@PathVariable @NotNull final Integer id) {
        return cs.delete(id);
    }

    @PostMapping("/{id}/cambiarestado")
    public ResponseEntity CambiarEstado(@PathVariable @NotNull final Integer id){
        return cs.cambiarEstado(id);
    }

}