import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  createList(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'todo', data);
  }

  updateList(data: any, id: any): Observable<any> {
    return this.http.put(environment.baseUrl + 'todo/' + id, data);
  }

  removeList(id: any): Observable<any> {
    return this.http.delete(environment.baseUrl + 'todo/' + id);
  }

  getList(): Observable<any> {
    return this.http.get(environment.baseUrl + 'todo');
  }

  createItem(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'items', data);
  }

  updateItem(data: any, id: number): Observable<any> {
    return this.http.put(environment.baseUrl + 'items/' + id, data);
  }

  removeItem(id: any): Observable<any> {
    return this.http.delete(environment.baseUrl + 'items/' + id);
  }
}
