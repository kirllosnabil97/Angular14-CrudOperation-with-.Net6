import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(public empService:EmployeeService,public datepipe :DatePipe, public toast:ToastrService) { }
  @ViewChild(EmployeeFormComponent) emp:EmployeeFormComponent;

  ngOnInit(): void {
    this.empService.getEmployees().subscribe(data=>{
      this.empService.listEmployee=data;
    });
  }

  populateEmployee(selectedEmployee:Employee)
  {
    
    let df=this.datepipe.transform(selectedEmployee.doj,'yyyy-MM-dd');
    selectedEmployee.doj=df;
   this.empService.employeeData=selectedEmployee;
   if(this.emp.isSlide==='off')
   {
    this.emp.hideShowSlide();
   }
  }
delete(id:number){
if(confirm('Are You Really want to delete this record?'))
{
this.empService.deleteEmployee(id).subscribe(data=>{
  console.log("Record deleted...");
  this.empService.getEmployees().subscribe(data=>{
    this.empService.listEmployee=data;
    this.toast.error('success','Record Deleted');
  });
},
err=>{
  console.log("Record Not deleted...");
});
}
}
}
