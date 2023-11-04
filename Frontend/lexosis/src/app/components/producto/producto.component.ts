import { Component,OnInit , ViewChild, TemplateRef} from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service'
import { MediaService } from '../../services/media.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Categoria } from '../../models/categoria';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  faCheck = faCheck
  faTimes = faTimes
  selectedFile: File | undefined
  selectedImage: string = ''
  productolist = new Array<Producto>()
  categorialist = new Array<Categoria>()
  productoFrom : FormGroup = new FormGroup({})
  update: boolean = false
  imagenActual: string
  @ViewChild('imageModal') imageModal!: TemplateRef<any>;
  modalRef: NgbModalRef | undefined
  p = new Producto()
  constructor(private mediaService:MediaService, private productoService: ProductoService,private categoriaService: CategoriaService,private modalService: NgbModal)
  {
  }
  ngOnInit() : void{
    this.getAll()
    this.getAllCategoria()
    this.productoFrom = new FormGroup({
      id: new FormControl(''),
      codigo:new FormControl(''),
      nombre:new FormControl(this.p.nombre, Validators.required),
      precioVenta: new FormControl(this.p.precioVenta, Validators.required),
      stock: new FormControl(this.p.stock, Validators.required),
      descripcion: new FormControl(''),
      imagen: new FormControl(''),
      activo: new FormControl(this.p.activo, Validators.required),
      categoria: new FormControl(this.p.categoria, Validators.required)
    })
  }


  get nombre() { return this.productoFrom.get('nombre') }
  get precioVenta() { return this.productoFrom.get('precioVenta') }
  get activo() { return this.productoFrom.get('activo') }
  get stock() { return this.productoFrom.get('stock') }
  get categoria() { return this.productoFrom.get('categoria') }


  onFileSelected(event: any) {
    if (event?.target?.files) {
        this.selectedFile = event.target.files[0]
    } else {
        console.error('No se ha seleccionado ningún archivo')
    }
}

upload(): Observable<string> {
  if (this.selectedFile) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    return this.mediaService.uploadFile(formData);
  } else {
    return of('');
  }
}
  getAll(){
    this.productoService.getAll().subscribe(response=>{
      this.productolist = response 
    },error=>{
      console.log(error)
    })
  }
  getAllCategoria(){
    this.categoriaService.getAll().subscribe(response=>{
      this.categorialist =response 
    },error=>{
      console.log(error)
    })
  }
  nuevoproducto(){
    this.update = false
    this.productoFrom.reset()
  }
  crearProducto(): Observable<Producto> {
    const p = new Producto()
    
    
    if (this.productoFrom) {
      const categoriaId = this.productoFrom.get('categoria')?.value
      const categoriaIdNumerico = Number(categoriaId)
      const categoriaSeleccionada = this.categorialist.find(cat => cat.id === categoriaIdNumerico)
      const activo = this.productoFrom.get('activo')?.value
      const activoBoolean = activo === '1'
      const imagen = this.productoFrom.get('imagen')?.value
  
  
      if (categoriaSeleccionada) {
        p.codigo = this.productoFrom.get('codigo')?.value
        p.nombre = this.productoFrom.get('nombre')?.value
        p.precioVenta = this.productoFrom.get('precioVenta')?.value
        p.stock = this.productoFrom.get('stock')?.value
        p.descripcion = this.productoFrom.get('descripcion')?.value
        p.activo = activoBoolean
        p.categoria = categoriaSeleccionada
      }
  
      if (this.update) {
        const productoid = this.productoFrom.get('id')?.value
        p.id = productoid
      }
    }
  
    return this.upload().pipe(
      switchMap((url: string) => {
        if(!url){
          console.log("cuando la asigna al objeto")
          console.log(this.imagenActual)
          p.imagen = this.imagenActual
        }else{
          p.imagen = url
        }
        return of(p)
      })
    );
  }
  save() {
    this.imagenActual = ''
    console.log(this.imagenActual)
    if (this.productoFrom.invalid) {
      this.marcarCamposInvalidos();
    }else{
      const productoObservable = this.crearProducto();
      if (productoObservable) {
        productoObservable.subscribe((p: Producto) => {
          this.productoService.save(p).subscribe(response => {
            this.getAll()
            alert("Alta Exitosa")
            this.productoFrom.reset()
          }, error => {
            console.log(error)
          });
        });
      }
    }
  } 
  updateProducto() {
    if (this.productoFrom.invalid) {
      this.marcarCamposInvalidos();
    }else{
      const productoObservable = this.crearProducto();
      if (productoObservable) {
        productoObservable.subscribe((p: Producto) => {
          this.productoService.update(p).subscribe(response => {
            this.getAll()
            alert("Modificacion Exitosa")
            this.productoFrom.reset()
            this.update = false
          }, error => {
            console.log(error)
          });
        });
      }
    }
  }
 
  delete (id : number){
    this.productoService.delete(id).subscribe (() =>{
      alert ("Baja exitosa")
      this.getAll()
    }, error =>{
      console.error(error)
    })
  }
  cambioestado (id : number){
    this.productoService.cambiarestado(id).subscribe (() =>{
      this.getAll()
    }, error =>{
      console.error(error)
    })
  }
  selectItem(item: any){
    this.update= true
    this.productoFrom.reset()
    this.imagenActual = item.imagen
    this.productoFrom.controls['id'].setValue(item.id)
    this.productoFrom.controls['codigo'].setValue(item.codigo)
    this.productoFrom.controls['nombre'].setValue(item.nombre)
    this.productoFrom.controls['precioVenta'].setValue(item.precioVenta)
    this.productoFrom.controls['stock'].setValue(item.stock)
    this.productoFrom.controls['descripcion'].setValue(item.descripcion)
    this.productoFrom.controls['activo'].setValue(item.activo ? '1' : '0')
    const categoriaElegida = this.categorialist.find(category => category.id === item.categoria.id);
    if (categoriaElegida) {
      this.productoFrom.controls['categoria'].setValue(categoriaElegida.id);

    }
  }


  marcarCamposInvalidos(): void {

    Object.values(this.productoFrom.controls).forEach(control => {
      control.markAsTouched()
    })
  }



  showImageModal(imagen: string) {
    this.selectedImage = imagen;
    this.modalRef = this.modalService.open(this.imageModal, { size: 'lg' });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
