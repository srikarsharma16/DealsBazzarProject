import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var server="http://localhost:8080" 

@Injectable({
  providedIn: 'root'
})
export class ViewuserService {

  constructor(private http:HttpClient) { }

  public getUser() : Observable<any>
  {
    return this.http.get(`${server}/admin/getUser`)
  }
}
