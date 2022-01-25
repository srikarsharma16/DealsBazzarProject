import { Component, OnInit } from '@angular/core';
import { ViewuserService } from '../viewuser.service';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  public users:any = [];
  

  constructor(private viewuserService:ViewuserService) { }

  ngOnInit(): void {
    this.viewuserService.getUser().subscribe((data:any)=>{
      this.users = data.data
      console.log(this.users)
    });
  }


}
