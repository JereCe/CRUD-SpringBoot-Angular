package com.example.demo.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


@Service
public class StorageService {

    @Value("${media.location}")
    private String  mediaLocation;
    private Path rootLocation;

    @PostConstruct
    public void init() throws IOException {
        rootLocation=Paths.get(mediaLocation);
        Files.createDirectories(rootLocation);

    }

    public String store(MultipartFile file){

        try {
            if (file.isEmpty()) {
                throw new RuntimeException("fallo en la carga archivo vacio");
            }
            String filename = file.getOriginalFilename();
            Path destinationFile = rootLocation.resolve(Paths.get(filename)).normalize().toAbsolutePath();
            try (InputStream inputSteam = file.getInputStream()) {
                Files.copy(inputSteam, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }
            return filename;
        }catch (IOException e){
            throw new RuntimeException("Fallo la carga del archivo",e);
        }
    }
    public Resource loadAsResource(String fileName){

        try {
            Path file = rootLocation.resolve(fileName);
            Resource resource = new UrlResource((file.toUri()));
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("el archivo no puede ser leido"+fileName);
            }
        }catch (MalformedURLException e){
            throw new RuntimeException("el archivo no puede ser leido"+fileName);
        }


    }
}
