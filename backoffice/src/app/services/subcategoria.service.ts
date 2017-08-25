import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Categoria } from '../models/categoria';
import { SubCategoria } from '../models/subcategoria';

@Injectable()
export class SubCategoriaService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public addSubCategoria(token, scat: SubCategoria) {

        let params = JSON.stringify(scat);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'subcategoria', params, { headers: headers })
            .map(res => res.json());
    }

    public getSubCategorias(page) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        })

        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'subcategorias/' + page, options)
            .map(res => res.json());
    }

    public getSubCategoria(token, id) {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })

        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'subcategoria/' + id, options)
            .map(res => res.json());
    }

    public editSubCategoria(token, id, scat: SubCategoria) {

        let params = JSON.stringify(scat);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url + 'subcategoria/' + id, params, { headers: headers })
            .map(res => res.json());
    }

    public deleteSubCategoria(token, id) {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })

        let options = new RequestOptions({ headers: headers });
        return this._http.delete(this.url + 'subcategoria/' + id, options)
            .map(res => res.json());
    }

}
