import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';
import { SubCategoriaService } from '../services/subcategoria.service';
import { SubCategoria } from '../models/subcategoria';



@Component({
    selector: 'subcategoria-add',
    templateUrl: '../views/subcategoria-add.html',
    providers: [SubCategoriaService,CategoriaService, UserService]
})

export class SubCategoriaAddComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url;
    public alertMessage;
    public categorias: Categoria[];
    public subcategoria: SubCategoria;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _catService: CategoriaService,
        private _userService: UserService,
        private _scatService: SubCategoriaService
    ) {
        this.titulo = 'Crear SubCategoria';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.subcategoria = new SubCategoria('', '','');
    }

    public ngOnInit() {
        this._catService.getCategorias('-1').subscribe(
            response => {
                if (!response.categorias) {
                    alert('Error en el servidor');
                } else {
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

    }

    public onSubmit() {
        console.log(this.subcategoria);
        this._scatService.addSubCategoria(this.token, this.subcategoria).subscribe(
        
            response => {
                if (!response.subcategoria) {
                    alert('Error en el servidor');
                } else {
                    this._router.navigate(['/subcategorias/1']);
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