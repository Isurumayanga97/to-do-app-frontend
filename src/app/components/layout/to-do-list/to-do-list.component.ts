import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateUpdateListComponent} from "./create-update-list/create-update-list.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../../services/todo.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {DatePipe} from "@angular/common";
import {UpdateItemComponent} from "./update-item/update-item.component";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, AfterViewInit {

  allList: Array<any> = []

  form = new FormGroup({
    item: new FormControl('', [Validators.required])
  })

  selectedIndex = 0;

  constructor(public dialog: MatDialog, private toDoService: TodoService, private toastr: ToastrService,
              private spinner: NgxSpinnerService, private datePipe: DatePipe) {
  }

  async ngOnInit(): Promise<any> {
    await this.spinner.show();
    await this.getList();
    await this.spinner.hide();
  }

  ngAfterViewInit() {

  }

  getList() {
    return new Promise(resolve => {
      this.toDoService.getList()
        .subscribe(res => {
          console.log(res);
          this.allList = res;
          resolve('');
        })
    });
  }

  removeList(id: number, index: number) {
    this.spinner.show();
    if (confirm('Are you sure to remove this list')) {
      this.toDoService.removeList(id)
        .subscribe(res => {
          this.allList.splice(index, 1);
          this.toastr.success(res);
          this.spinner.hide();
        })
    }
  }

  openDialog(data: { data: any, selectedIndex: any }): void {
    this.selectedIndex = data?.selectedIndex;
    this.dialog.open(CreateUpdateListComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: data.data
    }).afterClosed().subscribe((result: { type: 'create' | 'update', obj: any }) => {
      console.log(result);
      if (result) {
        if (result.type === 'create') {
          this.allList.push(result.obj);
        } else {
          this.allList[this.selectedIndex] = result.obj;
        }
      }
    });
  }

  markAsCompleted(param: any) {

    let data = {
      complete_time: param.item.complete_time ? null : this.datePipe.transform(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss')
    }

    this.spinner.show();
    this.toDoService.updateItem(data, param.item.id)
      .subscribe(res => {
        this.allList[param.i] = res.res;
        this.spinner.hide();
      });
  }

  delete(i: number) {
    if (confirm('Are you sure to delete this list?'))
      this.allList.splice(i, 1);
  }

  addItem(param: any) {
    if (param.newItem.value.length) {
      this.spinner.show();

      let obj = {
        details: param.newItem.value,
        complete_time: null,
        fk_todo_items_todoid: param.listId
      }

      this.toDoService.createItem(obj)
        .subscribe(res => {
          this.toastr.success(res);
          console.log(this.allList[param.listIndex].todo_items_sort);
          this.allList[param.listIndex].todo_items_sort = res.res;
          this.spinner.hide();
        });

      param.newItem.value = '';
    } else {
      alert('Please enter your item before submitting!');
    }
  }

  editItem(data: any) {
    this.dialog.open(UpdateItemComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: data.item
    }).afterClosed().subscribe((result) => {
      if (result)
        this.allList[data.listIndex] = result;
    });
  }

  deleteItem(data: { listIndex: number, itemIndex: number, itemId: number }) {
    this.spinner.show();
    this.toDoService.removeItem(data.itemId)
      .subscribe(res => {
        this.toastr.success(res);
        this.allList[data.listIndex].todo_items_sort.splice(data.itemIndex, 1);
        this.spinner.hide();
      })
  }
}
