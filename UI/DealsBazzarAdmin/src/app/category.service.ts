import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

var server="http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public getCategory() : Observable<any>
  {
    return this.http.get(`${server}/dealbazzar/fetchCategory`)
  }
  public saveCategory(data:any) : Observable<any>
  {
    return this.http.post(`${server}/dealbazzar/saveCategory`,data)
  }

  public updateCategory(ob:any) : Observable<any>
  {
    return this.http.put(`${server}/dealbazzar/updateCategory`,ob)
  }

  public deleteCategory(categoryId:String) : Observable<any>
  {
    return this.http.delete(`${server}/dealbazzar/deleteCategory/${categoryId}`,{observe: 'response'})
  }
}