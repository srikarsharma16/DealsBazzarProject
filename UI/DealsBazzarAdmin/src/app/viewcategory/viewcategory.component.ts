import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {

  public categories:any = [];

  public editDetails:any = {
    editcategory : undefined,
    editstatus : false 
  }

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((data:any)=>{
      this.categories = data.data
      console.log(this.categories)
    });
  }

  update(frm:NgForm)
  {
    var ob = frm.value
    ob.patientId = this.editDetails.editcategory.categoryId    
    this.categoryService.updateCategory(ob).subscribe(data=>
    {     
      this.categories = this.categories.map((ob:any)=>ob.categoryId==this.editDetails.editcategory.categoryId?data:ob)
      this.editDetails= {
        editpatient : undefined,
        editstatus : false
      }
    })
  }

  editCategory(category:any)
  {
    this.editDetails = {
      editcategory : category,
      editstatus : true
    }
  }

  save(frm:NgForm){
    console.log(frm.value)
    this.categoryService.saveCategory(frm.value).subscribe(data=>{
        this.categories.push(data)
    })
  }

  

  delCategory(categoryId:String){
    this.categoryService.deleteCategory(categoryId).subscribe(data=>{
        console.log(data.status)
        if(data.status==200){
          this.categories = this.categories.filter((cat:any)=>cat.categoryId!=categoryId)
        }else{
          alert("Not Deleted !")
        }
    })
  }



}
