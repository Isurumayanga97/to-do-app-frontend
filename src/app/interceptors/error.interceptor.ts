import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {catchError} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private spinner: NgxSpinnerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        this.toastr.error((error.error || '').toUpperCase());
        this.spinner.hide();
        return throwError(error.error);
      })
    );
  }
}
