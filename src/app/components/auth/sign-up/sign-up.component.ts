import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone_numbers: new FormArray([new FormGroup({phone_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])})]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  addContactNo() {
    this.form.controls.phone_numbers.push(
      new FormGroup({
        phone_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      })
    )
  }

  removeContactNo(index: number) {
    if (this.form.controls.phone_numbers.length > 1)
      this.form.controls.phone_numbers.removeAt(index)
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.spinner.show();
      this.authService.register(this.form.value)
        .subscribe(() => {
          this.toastr.success('User created successfully');
          this.router.navigate(['/sign-in']);
          this.spinner.hide();
        });
    }
  }
}
