import { Categoria } from "./categoria"


export class Producto {
   id: number
   codigo: string
   nombre: string
   precioVenta: number
   stock: number
   descripcion: string
   imagen: string
   activo: boolean
   categoria: Categoria

}
