import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {TodoService} from "../../../../services/todo.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  form = new FormGroup({
    details: new FormControl('', [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<UpdateItemComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private datePipe: DatePipe, private toDoService: TodoService, private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    console.log(data);
    this.form.controls.details.setValue(data.details);
  }

  ngOnInit(): void {

  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (confirm('Aye you sure to save this?')) {
        this.spinner.show();
        this.toDoService.updateItem(this.form.value, this.data.id)
          .subscribe(res => {
            this.toastr.success(res.message);
            this.dialogRef.close(res.res);
            this.spinner.hide();
          })
      }
    }
  }
}
