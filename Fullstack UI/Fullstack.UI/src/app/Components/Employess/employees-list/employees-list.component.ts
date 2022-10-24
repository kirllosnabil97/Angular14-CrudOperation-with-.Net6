import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from 'src/app/models/employee.model';
import { EmployessService } from 'src/app/Services/employess.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})

export class EmployeesListComponent implements OnInit {
 public employess: Employee[]=[];
  constructor(private employeesservice:EmployessService) { }

  ngOnInit(): void {
    this.employeesservice.getAllEmployees()
    // .subscribe({
    //   next:(employess)=>{
    //    this.employess=employess;
    //   },
    //   error:(Response) =>{
    //     console.log(Response);
    //   }
    // })
  }

}
