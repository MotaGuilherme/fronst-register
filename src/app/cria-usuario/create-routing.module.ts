import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CriaUsuarioComponent} from "./cria-usuario.component";



const routes: Routes = [
{path: 'auth/register', component: CriaUsuarioComponent},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreateRoutingModule { }

