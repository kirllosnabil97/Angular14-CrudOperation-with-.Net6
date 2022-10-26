import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Designation, Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private myhttp:HttpClient) {}
  employeeUrl:String ='https://localhost:7218/api/Employee';
  designationUrl:string='https://localhost:7218/api/Designation';
  listEmployee:Employee[]=[]; // for getting data employeelist
  listDesignation:Designation[]=[];

 employeeData:Employee=new Employee(); // for post data /insert data
designation:Designation=new Designation();

saveEmployee(){
  return this.myhttp.post('https://localhost:7218/api/Employee/CreateEmployee',this.employeeData);
  //return this.myhttp.post('https://localhost:7218/swagger/index.html',this.employeeData);

}
updateEmployee()
  {
    return this.myhttp.put(`${'https://localhost:7218/api/Employee/EditEmployee'}/${this.employeeData.id}` ,this.employeeData);
  }
  getEmployees():Observable<Employee[]>
  {
    return this.myhttp.get<Employee[]>('https://localhost:7218/api/Employee/GetEmployee');
  }
  getDesignations():Observable<Designation[]>
  {
    return this.myhttp.get<Designation[]>(this.designationUrl);
  }
  deleteEmployee(id:number)
  {
    return this.myhttp.delete(`${'https://localhost:7218/api/Employee/DeleteEmployee'}/${id}`);
  }
}
