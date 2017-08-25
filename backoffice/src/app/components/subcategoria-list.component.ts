import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { SubCategoriaService } from '../services/subcategoria.service';
import { Categoria } from '../models/categoria';
import { SubCategoria } from '../models/subcategoria';




@Component({
    selector: 'subcategoria-list',
    templateUrl: '../views/subcategoria-list.html',
    providers: [SubCategoriaService, UserService]
})

export class SubCategoriaListComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url;
    public alertMessage;
    public subcategorias: SubCategoria[];
    public pages;
    public page;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _scatService: SubCategoriaService,
        private _userService: UserService
    ) {
        this.titulo = 'Listar SubCategorias';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    public ngOnInit() {
        this.getSubCategorias();
    }

    public getSubCategorias() {
        this._route.params.forEach((params: Params) => {
            this.page = params['page'];

            this._scatService.getSubCategorias(this.page).subscribe(
                response => {
                    
                    if (!response.subcategorias) {
                        alert('Error en el servidor');
                    } else {

                        this.pages = Array.from(Array(Math.ceil(response.total_items / response.page_size)), (x, i) => i + 1);
                        this.subcategorias = response.subcategorias;
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
    
    public onDeleteSubCategoria(id) {
        this._scatService.deleteSubCategoria(this.token, id).subscribe(
            response => {
                if (!response.subcategoria) {
                    alert('Error en el servidor');
                } else {
                    this.getSubCategorias();
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