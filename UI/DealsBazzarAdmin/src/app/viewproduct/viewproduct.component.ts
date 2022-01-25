import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewproductService } from '../viewproduct.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  public products:any = [];
  
  constructor(private viewproductService:ViewproductService) { }

  ngOnInit(): void {
    this.viewproductService.getProducts().subscribe((data:any)=>{
      this.products = data.data
      console.log(this.products)
    });
  }

  editStatus(productId:String){
    this.viewproductService.setStatus(productId).subscribe(data=>{
      console.log(data)
        /* this.products = this.products.productId */
        /* if(data.status==200){
          this.products = this.products.filter((p:any)=>p.productId!=productId)
        }else{
          alert("Status not changed !")
        } */
    })
  }

}
