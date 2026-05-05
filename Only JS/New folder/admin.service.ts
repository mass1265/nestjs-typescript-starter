import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAdmin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public signalInterceptor = ({});
  public noInterceptor!: HttpClient;
  dataSignal = signal<any>(null);

  constructor(public http: HttpClient, public httpBackend: HttpBackend) {
    this.noInterceptor = new HttpClient(httpBackend);
  }

  getEmp1Data(): Observable<any> {
     return this.http.get<any>('https://dummyjson.com/products').pipe(
       tap(res => this.dataSignal.set(res))
     );
  }

  getEmp2Data(): Observable<IAdmin> {
    return this.noInterceptor.get<IAdmin>('https://jsonplaceholder.typicode.com/posts/2');
  }
}
