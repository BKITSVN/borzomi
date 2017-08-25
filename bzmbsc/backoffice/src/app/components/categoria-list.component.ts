import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';




@Component({
    selector: 'categoria-list',
    templateUrl: '../views/categoria-list.html',
    providers: [CategoriaService, UserService]
})

export class CategoriaListComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url;
    public alertMessage;
    public categorias: Categoria[];
    public pages;
    public page;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _catService: CategoriaService,
        private _userService: UserService
    ) {
        this.titulo = 'Listar Categorias';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;      
    }

    public ngOnInit() {
        this.getCategorias();
    }
    
    public getCategorias() {
        this._route.params.forEach((params: Params) => {
            this.page = params['page'];
           
            this._catService.getCategorias(this.page).subscribe(
                response => {
          
                    if (!response.categorias) {
                        alert('Error en el servidor');
                    } else {
                     
                        this.pages = Array.from(Array(Math.ceil(response.total_items / response.page_size)), (x, i) => i+1);
                        this.categorias = response.categorias;
                    }
                },
                error => {
                    var errorMessage = <any>error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        alert(body.message);
                    }
                }
            );
        });
    }

    public onDeleteCategoria(id)
    {
        this._catService.deleteCategoria(this.token,id).subscribe(
            response => {
                if (!response.categoria) {
                    alert('Error en el servidor');
                } else {
                   this.getCategorias();
                }
            },
            error => {
                var errorMessage = <any>error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    alert(body.message);
                }
            }
        );
    }

}