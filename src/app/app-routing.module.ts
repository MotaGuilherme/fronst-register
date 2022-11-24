import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [

  {
    path: 'auth/register',
    loadChildren: () => import('./app.module').then(m => m.AppModule)
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes),
            FormsModule,
            ReactiveFormsModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
