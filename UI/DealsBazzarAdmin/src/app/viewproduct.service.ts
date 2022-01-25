import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var server="http://localhost:8080" 

@Injectable({
  providedIn: 'root'
})
export class ViewproductService {

  constructor(private http:HttpClient) { }

  public getProducts() : Observable<any>
  {
    return this.http.get(`${server}/product/getproducts`)
  }
  public setStatus(productId:String) : Observable<any>
  {
    return this.http.put(`${server}/product/updateProductStatusByAdmin/${productId}`,{observe: 'response'})
  }
}
