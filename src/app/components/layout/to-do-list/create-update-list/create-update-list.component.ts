import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {TodoService} from "../../../../services/todo.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-create-update-list',
  templateUrl: './create-update-list.component.html',
  styleUrls: ['./create-update-list.component.css']
})
export class CreateUpdateListComponent implements OnInit {

  form = new FormGroup({
    fk_todo_list_userid: new FormControl('', []),
    id: new FormControl('', []),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    due_date: new FormControl('', [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<CreateUpdateListComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private datePipe: DatePipe, private toDoService: TodoService, private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    if (data) {
      this.form.controls.id.setValue(data.id);
      this.form.controls.title.setValue(data.title);
      this.form.controls.description.setValue(data.description);
      this.form.controls.due_date.setValue(datePipe.transform(data.due_date, 'yyyy-MM-ddTHH:mm'));
    }
  }

  ngOnInit(): void {
    this.form.controls.fk_todo_list_userid.setValue(localStorage.getItem('id'));
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (confirm('Aye you sure to save this?')) {
        this.spinner.show();
        if (this.form.controls.id.value) {
          this.update();
        } else {
          this.create();
        }
      }
    }
  }

  create() {
    this.toDoService.createList(this.form.value)
      .subscribe(res => {
        this.toastr.success(res.message);
        this.dialogRef.close({type: 'create', obj: res.res});
        this.spinner.hide();
      })
  }

  update() {
    this.toDoService.updateList(this.form.value, this.form.controls.id.value)
      .subscribe(res => {
        this.toastr.success(res.message);
        this.dialogRef.close({type: 'update', obj: res.res});
        this.spinner.hide();
      })
  }

}
