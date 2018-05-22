import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router'; //Componentes que usaremos para redireccionar
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //Vista asociada
  styleUrls: ['./app.component.css'],  //Estilos asociados
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title:string;
  public identity;
  public url :string;


  constructor(
      private _route : ActivatedRoute,
      private _router : Router,
      private _userService : UserService
  ){
      this.title  = 'Ruben Diaz WEBAPP ';
      this.url = GLOBAL.url;
  }

  ngOnInit(){
      this.identity = this._userService.getIdentity(); // Objeto del usuario identificado
      console.log(this.identity);
  }

  ngDoCheck(){ // Cada vez que se hace un cambio(refresco dinamico de la web)
      this.identity = this._userService.getIdentity();
  }

  logout(){
      localStorage.clear();
      this.identity = null;
      this._router.navigate(['/']); //Redireccion a home cuando se delogee
  }
}
