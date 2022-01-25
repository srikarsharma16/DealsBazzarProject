import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymenttypeService } from '../paymenttype.service';

@Component({
  selector: 'app-paymenttype',
  templateUrl: './paymenttype.component.html',
  styleUrls: ['./paymenttype.component.css']
})
export class PaymenttypeComponent implements OnInit {

  public payment: any = [];

  public payments:any = [];

  public editDetails:any = {
    editpayment : undefined,
    editstatus : false 
  }

  constructor(private paymenttypeservice: PaymenttypeService) { }

  /* ngOnInit(): void {
    this.paymenttypeservice.getPaymentType().subscribe((data: any) => {
      this.payment = data.data
      console.log(this.payment)
      console.log(data.data)
    });
  } */

  ngOnInit(): void {
    this.paymenttypeservice.getPaymentType().subscribe((data:any)=>{
      this.payment = data.data
      console.log(this.payment)
    });
  }

  update(frm:NgForm)
  {
    var ob = frm.value
    ob.paymentTypeId = this.editDetails.editpayment.paymentTypeId    
    this.paymenttypeservice.updatePayment(ob).subscribe(data=>
    {     
      this.payment = this.payment.map((ob:any)=>ob.paymentTypeId==this.editDetails.editpayment.paymentTypeId?data:ob)
      this.editDetails= {
        editpayment : undefined,
        editstatus : false
      }
    })
  }

  editPayment(payment:any)
  {
    this.editDetails = {
      editpayment : payment,
      editstatus : true
    }
  }

  save(frm: NgForm) {
    console.log(frm.value)
    this.paymenttypeservice.savePayment(frm.value).subscribe(data => {
      this.payment.push(data)
    })
  }

  delPayment(paymentTypeId:String){
    this.paymenttypeservice.deletePayment(paymentTypeId).subscribe(data=>{
        console.log(data.status)
        if(data.status==200){
          this.payment = this.payment.filter((pay:any)=>pay.paymentTypeId!=paymentTypeId)
        }else{
          alert("Not Deleted !")
        }
    })
  }

}
