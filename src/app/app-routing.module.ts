import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'detalle-producto/:id', component:DetalleProductoComponent},
  {path:'editar-productos', component:EditarProductosComponent},
  {path:'listar-pedidos', component:ListarPedidosComponent},
  {path:'**', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
