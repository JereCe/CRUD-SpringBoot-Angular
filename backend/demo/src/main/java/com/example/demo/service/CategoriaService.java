package com.example.demo.service;

import com.example.demo.model.Categoria;


import com.example.demo.model.Producto;
import com.example.demo.repository.CategoriaRepository;
import com.example.demo.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository cr;

    public CategoriaService(ProductoRepository pr){
        this.cr = cr;
    }

    public ResponseEntity<List<Categoria>> getAll() {
        try {
            List<Categoria> categorias = cr.findAll();
            return ResponseEntity.ok(categorias);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity add(Categoria c){

        try{
            cr.save(c);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    public ResponseEntity update(Integer id,Categoria c){
        try {
            Categoria categoriaTemporal = cr.findById(id).orElseThrow(()->new HttpClientErrorException(HttpStatus.BAD_REQUEST,"Categoria no encontrada"));
            categoriaTemporal.setNombre(c.getNombre());
            categoriaTemporal.setDescripcion(c.getDescripcion());
            categoriaTemporal.setActivo(c.getActivo());

            cr.save(categoriaTemporal);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity delete(Integer id){

        try {
            cr.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    public ResponseEntity cambiarEstado(Integer id) {

        try {
            Categoria categoriaTemporal = cr.findById(id).orElseThrow(()->new HttpClientErrorException(HttpStatus.BAD_REQUEST,"Categoria no encontrada"));
            if(categoriaTemporal.getActivo() == true){
                categoriaTemporal.setActivo(false);
            }else{
                categoriaTemporal.setActivo(true);
            }
            cr.save(categoriaTemporal);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


    }
}
