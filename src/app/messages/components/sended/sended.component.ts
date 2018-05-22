import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { UserService } from '../../../services/user.service';
import { Follow } from '../../../models/follow';
import { GLOBAL } from '../../../services/global';
import { FollowService } from '../../../services/follow.service';

@Component({
    selector: 'sended',
    templateUrl: './sended.component.html',
    providers: [FollowService,MessageService]
})
export class SendedComponent implements OnInit{
    public title : string;
    public message: Message;
    public identity;
    public token;
    public url : string;
    public status: string;
    public follows;
    public messages : Message[];
    public pages;
    public total;
    public page;
    public next_page;
    public prev_page;

    constructor(
        private _route: ActivatedRoute,
        private _router : Router,
        private _followService: FollowService,
        private _messageService : MessageService,
        private _userService : UserService
    ){
        this.title= 'Mensajes enviados';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('sended cargado...');
        this.actualPage();

    }

    getMessages(token,page){
        this._messageService.getEmittMessages(token, page).subscribe(
            response =>{
                if(!response.messages){
                    console.log(response);
                }else{
                    this.messages = response.messages;
                    this.total = response.total;
                    this.pages = response.pages;
                    console.log(response);
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }

    actualPage(){
        this._route.params.subscribe(params =>{
            let page = +params['page'];
            this.page = page;

            if(!params['page']){
                page=1;
            }

            if(!page){
                page = 1;
            }else{
                this.next_page = page+1;
                this.prev_page = page-1;
                if(this.prev_page <= 0){
                    this.prev_page= 1;
                }
            }
                this.getMessages(this.token, this.page);

        });
    }
}
