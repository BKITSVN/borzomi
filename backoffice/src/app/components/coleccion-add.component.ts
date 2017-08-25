import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ColeccionService } from '../services/coleccion.service';
import { Coleccion } from '../models/coleccion';


@Component({
    selector: 'coleccion-add',
    templateUrl: '../views/coleccion-add.html',
    providers: [ColeccionService, UserService]
})

export class ColeccionAddComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url;
    public alertMessage;
    public coleccion: Coleccion;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _colService: ColeccionService,
        private _userService: UserService
    ) {
        this.titulo = 'Alta Coleccion';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.coleccion = new Coleccion('', '');
    }

    public ngOnInit() {


    }
    public onSubmit() {
        this._colService.addColeccion(this.token, this.coleccion).subscribe(
            response => {

                if (!response.coleccion) {
                    this.alertMessage = 'Error en el servidor';
                } else {
                    alert('La coleccion se ha creado correctamente');
                    this._router.navigate(['/colecciones/1']);
                }
            },
            error => {
                var errorMessage = <any>error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                    console.log(error);
                }
            }
        );
    }

}