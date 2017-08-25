import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';


@Component({
    selector: 'categoria-add',
    templateUrl: '../views/categoria-add.html',
    providers: [CategoriaService, UserService]
})

export class CategoriaAddComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url;
    public alertMessage;
    public categoria: Categoria;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _catService: CategoriaService,
        private _userService: UserService
    ) {
        this.titulo = 'Alta Categoria';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.categoria = new Categoria('', '');
    }

    public ngOnInit() {
        
    
    }
    public onSubmit() {
        this._catService.addCategoria(this.token, this.categoria).subscribe(
            response => {

                if (!response.categoria) {
                    this.alertMessage = 'Error en el servidor';
                } else {
                    alert('La categoria se ha creado correctamente');                    
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
    }

}