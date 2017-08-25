import { Component,OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { GLOBAL } from './services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent {
    public user: User;
    public identity;
    public token;
    public errorMessage;
    public url

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.user = new User('', '', '', '', '', 'ROLE_ADMIN', '');    
        this.url = GLOBAL.url;
    }

    ngOnInit() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    public onSubmit() {

        //Conseguir los datos del usuario identificado
        this._userService.singup(this.user).subscribe(
            response => {

                let identity = response.user;
                this.identity = identity;

                if (!this.identity._id) {
                    alert("El usuario no esta correctamente identificado");
                } else {
                    //Crear elementos en el localStorage para tenewr el usuario en sesion
                    localStorage.setItem('identity', JSON.stringify(identity));
                   
                    //Conseguir el token para enviarselo a cada peticion http                    
                    this._userService.singup(this.user, 'true').subscribe(
                        response => {

                            let token = response.token;
                            this.token = token;

                            if (this.token.length <= 0) {
                                alert("Token no generado");
                            } else {
                                localStorage.setItem('token', token);
                                this.user = new User('', '', '', '', '', 'ROLE_USER', '');
                            }

                        },
                        error => {
                            var errorMessage = <any>error;
                            if (errorMessage != null) {

                                var body = JSON.parse(error._body);

                                this.errorMessage = body.message;
                                //console.log(error);
                            }
                        });
                }

            },
            error => {
                var errorMessage = <any>error;
                if (errorMessage != null) {

                    var body = JSON.parse(error._body);

                    this.errorMessage = body.message;
                    console.log(error);
                }
            });
    }

    public logout() {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        localStorage.clear();
        this.identity = null;
        this.token = null;
        this._router.navigate(['/']);
    }


}
