import { Component,OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoriaList = new Array<Categoria>()
  faCheck = faCheck;
  faTimes = faTimes;
  update: boolean = false
  categorialist = new Array<Categoria>()
  categoriaFrom : FormGroup = new FormGroup({})
  c = new Categoria();


  constructor(private categoriaService: CategoriaService){}

  ngOnInit() : void{
    this.getAll()
    this.categoriaFrom = new FormGroup({
      id: new FormControl(''),
      nombre:new FormControl(this.c.nombre, Validators.required),
      descripcion: new FormControl(''),
      activo: new FormControl(this.c.activo, Validators.required)
    })
  }

  get nombre() { return this.categoriaFrom.get('nombre') }
  get activo() { return this.categoriaFrom.get('activo') }

  getAll(){
    this.categoriaService.getAll().subscribe(response =>{
      this.categoriaList = response
    },error=>{
      console.log(error)
    })

  }
  
  nuevaCategoria(){
    this.update = false
    this.categoriaFrom.reset()
  }

  crearCategoria(){
    
    if (this.categoriaFrom) {
      const activo = this.categoriaFrom.get('activo')?.value
      const activoBoolean = activo === '1'
      this.c.nombre = this.categoriaFrom.get('nombre')?.value
      this.c.descripcion = this.categoriaFrom.get('descripcion')?.value
      this.c.activo = activoBoolean
      if (this.update) {
        const categoriaid = this.categoriaFrom.get('id')?.value
        this.c.id = categoriaid
      }
    }
    return this.c
  }

  save(){

    if (this.categoriaFrom.invalid) {

      this.marcarCamposInvalidos();
    }else{

      const c = this.crearCategoria()
      if(c){
        this.categoriaService.save(c).subscribe(response=>{
        this.getAll();
        alert("Alta Exitosa")
        this.categoriaFrom.reset()
        },error=>{
          console.log(error)
        })   
      }
    }
  }

updateCategoria(){

  if (this.categoriaFrom.invalid) {

    this.marcarCamposInvalidos();
  }else{

    const c = this.crearCategoria()
    if(c){
      this.categoriaService.update(c).subscribe(response=>{
      this.getAll();
      alert("Modificacion Exitosa")
      this.categoriaFrom.reset()
      this.update = false
        },error=>{
          console.log(error)
        })   
      }     
    }
}
delete (id : number){
  this.categoriaService.delete(id).subscribe (() =>{
    alert ("Baja exitosa")
    this.getAll()
  }, error =>{
    console.error(error)
  })
}

cambioestado (id : number){
  this.categoriaService.cambiarestado(id).subscribe (() =>{
    this.getAll()
  }, error =>{
    console.error(error)
  })
}

selectItem(item: any){
  this.update= true
  this.categoriaFrom.controls['id'].setValue(item.id)
  this.categoriaFrom.controls['nombre'].setValue(item.nombre)
  this.categoriaFrom.controls['descripcion'].setValue(item.descripcion)
  this.categoriaFrom.controls['activo'].setValue(item.activo ? '1' : '0')
 
}

marcarCamposInvalidos(): void {

  Object.values(this.categoriaFrom.controls).forEach(control => {
    control.markAsTouched()
  })
}






}
