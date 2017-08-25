import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';
import { SubCategoriaService } from '../services/subcategoria.service';
import { SubCategoria } from '../models/subcategoria';



@Component({
    selector: 'subcategoria-edit',
    templateUrl: '../views/subcategoria-add.html',
    providers: [SubCategoriaService,CategoriaService, UserService]
})

export class SubCategoriaEditComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url;
    public alertMessage;
    public categorias: Categoria[];
    public subcategoria: SubCategoria;
    public is_edit;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _catService: CategoriaService,
        private _userService: UserService,
        private _scatService: SubCategoriaService
    ) {
        this.titulo = 'Editar SubCategoria';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.subcategoria = new SubCategoria('', '', '');
        this.is_edit = true;
    }

    public ngOnInit() {
       this.getSubCategoria();
        
    }

    public getSubCategoria() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._scatService.getSubCategoria(this.token, id).subscribe(
                response => {

                    if (!response.subcategoria) {
                        alert('Error en el servidor');
                    } else {
                        this.subcategoria = response.subcategoria;

                    

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

    public onSubmit() {

        this._route.params.forEach((params: Params) => {
            let id = params['id'];
        

        this._scatService.editSubCategoria(this.token, id, this.subcategoria).subscribe(
            
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
        });
    }

}