import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CriaUsuarioComponent} from "../cria-usuario/cria-usuario.component";
import {UsuarioComponent} from "../usuario/usuario.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [CriaUsuarioComponent, UsuarioComponent],
  exports: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class SharedModule { }
