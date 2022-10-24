import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './Components/Employess/employees-list/employees-list.component';

const routes: Routes = [
  {
    path:'',
    component:EmployeesListComponent
  },
  {
    path:'Employees',
    component:EmployeesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
