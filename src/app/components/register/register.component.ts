//Importe basico para crear un componente
import {Component, OnInit} from '@angular/core';
//Imports para poder usar las rutas y el modelo usario
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector : 'register',
  templateUrl : './register.component.html',
  providers: [UserService]   //Para listar los servicios que quiero tener disponible en nuestro componente
})

export class RegisterComponent implements OnInit{
  public title : string;
  public user : User;
  public status : string;

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _userService : UserService

  ){
    this.title = 'Registrate';
    this.user = new User("","","","","","","ROLE_USER","");
  }

  ngOnInit(){
    console.log('Componente de register cargado...');
  }

  //Cuando se envia el formulario
  onSubmit(form){
    this._userService.register(this.user).subscribe(  //Recibir respuestas del backend
      response =>{
        if(response.user && response.user._id){
          //console.log(response.user);
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error';
        }
      },
      err =>{
        console.log(<any>err);
      }
    );
  }


}
