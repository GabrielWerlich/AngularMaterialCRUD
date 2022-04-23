import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  stateList = ["Brand New", "Second Hand", "Refurbished"];
  productForm!: FormGroup;
  btnSaveOrUpdate : string = "Save";

  constructor(private FormBuilder : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.productForm = this.FormBuilder.group({
      productName: ['',Validators.required],
      category: ['',Validators.required],
      state: ['',Validators.required],
      price: ['',Validators.required],
      comment: ['',],
      date: ['',Validators.required]
    })

    if(this.editData){
      this.btnSaveOrUpdate = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['state'].setValue(this.editData.state);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error to add product");
          }
      })
    }
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error to update product");
      }
  })
  }

}
