//Importe basico para crear un componente
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { FollowService } from '../../services/follow.service';


@Component({
    selector: 'followed',
    templateUrl: './followed.component.html',
    providers: [UserService,FollowService]
})
export class FollowedComponent implements OnInit{
    public title: string;
    public identity;
    public token;
    public page;
    public next_page;
    public prev_page;
    public status: string;
    public total;
    public pages;
    public users : User[];
    public url: string;
    public follows;
    public followed;
    public userPageId;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService : FollowService
    ){
        this.title = "Seguidores de ";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        this.actualPage();
    }


    actualPage(){
        this._route.params.subscribe(params =>{
            let user_id = params['id'];
            let page = +params['page'];
            this.userPageId = user_id;
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
            //Devolver usuario
            this.getUser(user_id, page);

        });
    }

    getFollows(user_id,page){
        this._followService.getFollowed(this.token, user_id, page).subscribe(
            response =>{
                if(!response.follows){
                    this.status = 'error';
                    console.log(response);
                }else{
                    this.total = response.total;
                    this.followed = response.follows;
                    this.pages = response.pages;
                    this.follows = response.users_following;
                    console.log(response);

                    if(page > this.pages){
                        this._router.navigate(['/gente/1']);
                    }
                }

            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }

        );
    }
    public user : User;
    getUser(user_id,page){
        this._userService.getUser(user_id).subscribe(
            response =>{
                if(response.user){
                    this.user = response.user;
                    //Devolver listado de usuarios
                    this.getFollows(user_id,page);
                }else{
                    this._router.navigate(['/home']);
                }
            },
            error =>{
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }



    public followUserOver;
    mouseEnter(user_id){
        this.followUserOver = user_id;
    }

    mouseLeave(user_id){
        this.followUserOver = 0;
    }

    followUser(followed){
        var follow = new Follow('',this.identity._id,followed);

        this._followService.addFollow(this.token, follow).subscribe(
            response => {
                if(!response.follow){
                    this.status ='error';
                }else{
                    this.status = 'success';
                    this.follows.push(followed);
                }

            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    unfollowUser(followed){
        this._followService.deleteFollow(this.token, followed).subscribe(
            response => {
                var search = this.follows.indexOf(followed);
                if(search != -1){
                    this.follows.splice(search,1);
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }




}
