import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppPedidosComponent } from './components/app-pedidos/app-pedidos.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
      { path: '', component: LoginComponent },
      { path: 'store', component: AppPedidosComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
