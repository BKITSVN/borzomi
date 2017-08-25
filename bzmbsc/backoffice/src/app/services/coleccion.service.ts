import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Coleccion } from '../models/coleccion';

@Injectable()
export class ColeccionService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public addColeccion(token, col: Coleccion) {

        let params = JSON.stringify(col);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'coleccion', params, { headers: headers })
            .map(res => res.json());
    }

    public getColecciones(page) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        })

        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'colecciones/' + page, options)
            .map(res => res.json());
    }



    public getColeccion(token, id) {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })

        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'coleccion/' + id, options)
            .map(res => res.json());
    }

    public editColeccion(token, id, col: Coleccion) {

        let params = JSON.stringify(col);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url + 'coleccion/' + id, params, { headers: headers })
            .map(res => res.json());
    }

    public deleteColeccion(token, id) {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })

        let options = new RequestOptions({ headers: headers });
        return this._http.delete(this.url + 'coleccion/' + id, options)
            .map(res => res.json());
    }

}
