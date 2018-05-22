//Importe basico para crear un componente
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit{
    public title:string;

    constructor(){
        this.title= 'Bienvenido a la Red Social'
    }

    ngOnInit(){
        console.log('Hola desde la home');
    }

}
