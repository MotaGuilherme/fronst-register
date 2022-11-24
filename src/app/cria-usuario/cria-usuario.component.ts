import { Component, OnInit } from '@angular/core';
import {UserService} from "../usuario/usuario.service";
import {UserModel} from "../../model/user-model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {distinctUntilChanged, empty, Observable, switchMap, tap} from "rxjs";


@Component({
  selector: 'app-cria-usuario',
  templateUrl: './cria-usuario.component.html',
  styleUrls: ['./cria-usuario.component.scss']
})
export class CriaUsuarioComponent implements OnInit {

  public userForm: FormGroup

  cep: any;
  usuarios$: Observable<UserModel[]>;
  submitted: boolean

  constructor(private userService: UserService,
              private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required ]],
      email: ['', [Validators.required]],
      password:['', [Validators.required]],
      endereco: this.fb.group({
        cep: ['', ],
        street: ['', [Validators.required]],
        district: ['', Validators.required],
        locality: ['', Validators.required],
        UF: ['', Validators.required]
      }),
      //const id = Number(this.route.snapshot.paramMap.get('id'));

    })
    // @ts-ignore
    this.userForm.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          // @ts-ignore
          this.userService.consultaCEP(this.userForm.get('endereco.cep').value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

  }

  consultaCEP() {

    // @ts-ignore
    let cep = this.userForm.get('endereco.cep').value;
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.userService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  async createUser() {
    this.submitted = true;
    await this.userService.createUser(this.userForm.value).subscribe()
  }
  populaDadosForm(dados: any) {

    this.userForm.patchValue({
      endereco: {
        cep: dados.cep,
        street: dados.logradouro,
        district: dados.bairro,
        locality: dados.localidade,
        UF: dados.uf
      }
    });

  }


}
