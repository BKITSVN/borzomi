import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ColeccionService } from '../services/coleccion.service';
import { Coleccion } from '../models/coleccion';




@Component({
    selector: 'coleccion-list',
    templateUrl: '../views/coleccion-list.html',
    providers: [ColeccionService, UserService]
})

export class ColeccionListComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url;
    public alertMessage;
    public colecciones: Coleccion[];
    public pages;
    public page;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _colService: ColeccionService,
        private _userService: UserService
    ) {
        this.titulo = 'Listar Colecciones';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    public ngOnInit() {
        this.getColecciones();
    }

    public getColecciones() {
        this._route.params.forEach((params: Params) => {
            this.page = params['page'];

            this._colService.getColecciones(this.page).subscribe(
                response => {

                    if (!response.colecciones) {
                        alert('Error en el servidor');
                    } else {

                        this.pages = Array.from(Array(Math.ceil(response.total_items / response.page_size)), (x, i) => i + 1);
                        this.colecciones = response.colecciones;
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
    /*
    public onDeleteCategoria(id) {
        this._catService.deleteCategoria(this.token, id).subscribe(
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
    }*/

}