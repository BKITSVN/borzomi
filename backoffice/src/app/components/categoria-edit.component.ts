import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';


@Component({
    selector: 'categoria-edit',
    templateUrl: '../views/categoria-add.html',
    providers: [CategoriaService, UserService]
})

export class CategoriaEditComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url;
    public alertMessage;
    public categoria: Categoria;
    public is_edit;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _catService: CategoriaService,
        private _userService: UserService
    ) {
        this.titulo = 'Editar Categoria';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.categoria = new Categoria('', '');
        this.is_edit = true;
    }

    public ngOnInit() {
        this.getCategoria();
    }

    public getCategoria() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._catService.getCategoria(this.token, id).subscribe(
                response => {

                    if (!response.categoria) {
                        this._router.navigate(['/']);
                    } else {
                        this.categoria = response.categoria;
                    }
                },
                error => {
                    var errorMessage = <any>error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        this.alertMessage = body.message;

                    }
                }
            );
        });
    }

    public onSubmit() {
    
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._catService.editCategoria(this.token, id, this.categoria).subscribe(
                response => {

                    if (!response.categoria) {
                        this.alertMessage = 'Error en el servidor';
                    } else {
                        alert('La categoria se ha modificado correctamente');
                        this._router.navigate(['/categorias/1']);                  
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
        });

    }

}