import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';


@Injectable()
export class UserService{
    public url : string;
    public identity;
    public token;
    public stats;

    constructor( public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    //Servicio de Registro de usuario
    register(user: User) : Observable<any>{
        let params = JSON.stringify(user); //Convertimos el usuario a JSON
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'register', params, {headers: headers}); // Solicitud al servidor de la API
    }

    //Servicio de logeo de usuario
    signup(user : any , gettoken = null ) : Observable<any>{

        if(gettoken != null){
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user); //Convertimos el usuario a JSON
        let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Defino las cabeceras HTTP

        return this._http.post(this.url+'login', params, {headers: headers});
    }


    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity')); //Convertir el archivo identity de LocalStorage a objeto JS
        if(identity != 'undefined'){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token'); //Convertir el archivo identity de LocalStorage a objeto JS
        if(token != 'undefined'){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }

    //Conseguir los stats del localStorage
    getStats(){
        let stats = JSON.parse(localStorage.getItem('stats'));

        if(stats != "undefined"){
            this.stats = stats;
        }else{
            this.stats = null;
        }
        return this.stats;
    }

    //Conseguir los contadores de la Base de datos
    getCounter(userId = null): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization', this.getToken());

        if(userId != null){
            return this._http.get(this.url+'counters/'+userId, {headers:headers});
        }else{
            return this._http.get(this.url+'counters/', {headers:headers});
        }
    }

    updateUser(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization', this.getToken());


        return this._http.put(this.url+'update-user/'+user._id, params, {headers:headers});
    }
    //Sacar usuarios listados
    getUsers(page = null): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization', this.getToken());

        return this._http.get(this.url+'users/'+page, {headers:headers});

    }

    //Sacar un usuario
    getUser(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization', this.getToken());

        return this._http.get(this.url+'user/'+id, {headers:headers});

    }


}
