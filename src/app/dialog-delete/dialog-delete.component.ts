import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

  constructor(private api : ApiService, @Inject(MAT_DIALOG_DATA) public deleteRecord: any, private dialogDelete : MatDialogRef<DialogDeleteComponent>) { }

  ngOnInit(): void {
  }

  confirmDelete(){
    this.api.deleteProduct(this.deleteRecord.id)
    .subscribe({
      next:(res)=>{
        this.dialogDelete.close('delete');
      },
      error:()=>{
        alert("Error to delete product");
      }
    })
    console.log(this.deleteRecord)
  }

}
