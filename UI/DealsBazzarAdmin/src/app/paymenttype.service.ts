import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var server="http://localhost:8080" 

@Injectable({
  providedIn: 'root'
})
export class PaymenttypeService {

  constructor(private http:HttpClient) { }

  public getPaymentType() : Observable<any>
  {
    return this.http.get(`${server}/dealbazzar/fetchPaymentType`)
  }
  public savePayment(data:any) : Observable<any>
  {
    return this.http.post(`${server}/dealbazzar/savePaymentType`,data)
  }

  public updatePayment(ob:any) : Observable<any>
  {
    return this.http.put(`${server}/dealbazzar/updatePaymentType`,ob)
  }

  public deletePayment(paymentTypeId:String) : Observable<any>
  {
    return this.http.delete(`${server}/dealbazzar/deletePaymentType/${paymentTypeId}`,{observe: 'response'})
  }
}
