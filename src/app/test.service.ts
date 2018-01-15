import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TestService {

  result:any;

  constructor(private _http: Http) { }

  getData() {
    return this._http.get("/api/test")
      .map(resp => this.result = resp.json());
  }

}
