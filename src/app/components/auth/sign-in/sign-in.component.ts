import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private router: Router, private authService: AuthService, private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.spinner.show();
      this.authService.login(this.form.value)
        .subscribe((res) => {
          this.toastr.success('Login successful!');
          localStorage.setItem('token', res.token);
          localStorage.setItem('firstName', res.first_name);
          localStorage.setItem('id', res.id);
          this.router.navigate(['/']);
          this.spinner.hide();
        })
    }
  }
}
