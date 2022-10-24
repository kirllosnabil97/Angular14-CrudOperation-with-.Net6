import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployessService {
baseApiUrl:string=environment.baseApiUrl;
  constructor(private http: HttpClient) { }
  getAllEmployees(){
this.http.get(this.baseApiUrl+'/api/employees')
  }
}
