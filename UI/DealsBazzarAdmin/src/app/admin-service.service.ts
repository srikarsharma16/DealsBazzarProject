import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient) { }
  public adminLogin(credential: any){
    return this.http.post("http://localhost:9090/admin/login",credential,{responseType:'text' as 'json'});
  }
}
