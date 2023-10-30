package com.example.demo.service;
import com.example.demo.model.Categoria;
import com.example.demo.model.Producto;
import com.example.demo.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import java.util.List;
import static javax.security.auth.callback.ConfirmationCallback.OK;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository pr;

    public ProductoService(ProductoRepository pr){
        this.pr = pr;

    }

    public ResponseEntity<List<Producto>> getAll() {
        try {
            List<Producto> productos = pr.findAll();
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity add(Producto p){

        try{
            pr.save(p);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    public ResponseEntity update(Integer id,Producto p){
        try {
            Producto productoTemporal = pr.findById(id).orElseThrow(()->new HttpClientErrorException(HttpStatus.BAD_REQUEST,"Producto no encontrado"));
            productoTemporal.setCodigo(p.getCodigo());
            productoTemporal.setNombre(p.getNombre());
            productoTemporal.setPrecioVenta(p.getPrecioVenta());
            productoTemporal.setStock(p.getStock());
            productoTemporal.setDescripcion(p.getDescripcion());
            productoTemporal.setImagen(p.getImagen());
            productoTemporal.setActivo(p.getActivo());
            productoTemporal.setCategoria(p.getCategoria());
            pr.save(productoTemporal);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    public ResponseEntity delete(Integer id){
        try {
            pr.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity cambiarEstado(Integer id) {

        try {
            Producto productoTemporal = pr.findById(id).orElseThrow(()->new HttpClientErrorException(HttpStatus.BAD_REQUEST,"Producto no encontrado"));
            if(productoTemporal.getActivo() == true){
                productoTemporal.setActivo(false);
            }else{
                productoTemporal.setActivo(true);
            }
            pr.save(productoTemporal);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


    }
}
