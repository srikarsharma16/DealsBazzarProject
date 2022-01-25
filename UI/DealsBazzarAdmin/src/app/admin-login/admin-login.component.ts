import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
import { Credential } from '../credential';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  credential:Credential= new Credential("","");
  msg : any;

  constructor(private service:AdminServiceService,private router:Router){}
  ngOnInit(): void {
  }
  public doLogin(){
    let resp=this.service.adminLogin(this.credential);
    console.log(this.credential);
    console.log("credential : "+JSON.stringify(this.credential));
    resp.subscribe((cred:any)=>this.msg=cred);
    if(this.credential!=null)
    this.router.navigate(["/admin-uses"])
     
  }

}
