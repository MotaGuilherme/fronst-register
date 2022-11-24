import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioComponent} from "./usuario.component";
import {CriaUsuarioComponent} from "../cria-usuario/cria-usuario.component";


const routes: Routes = [
  {path: 'auth/register', component: CriaUsuarioComponent},
  {path: 'editUser', component: UsuarioComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsuarioRoutingModule { }
