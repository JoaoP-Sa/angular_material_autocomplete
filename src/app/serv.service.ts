import { ResponseData } from './interface';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServService {

  constructor(private http : HttpClient) { }

  getData(): Observable<ResponseData[]>{
    return this.http.get<ResponseData[]>('https://jsonplaceholder.typicode.com/users');
  }
}
