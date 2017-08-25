import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Categoria } from '../models/categoria';

@Injectable()
export class CategoriaService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public addCategoria(token, cat: Categoria) {

        let params = JSON.stringify(cat);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'categoria', params, { headers: headers })
            .map(res => res.json());
    }

    public getCategorias(page) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        })

        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'categorias/' + page, options)
            .map(res => res.json());
    }



    public getCategoria(token, id)
    {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })

        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'categoria/' + id, options)
            .map(res => res.json());
    }

    public editCategoria(token, id,  cat: Categoria) {

        let params = JSON.stringify(cat);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url + 'categoria/' + id, params, { headers: headers })
            .map(res => res.json());
    }

    public deleteCategoria(token, id) {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })

        let options = new RequestOptions({ headers: headers });
        return this._http.delete(this.url + 'categoria/' + id, options)
            .map(res => res.json());
    }

}
