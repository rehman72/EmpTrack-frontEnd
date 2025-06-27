import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { Employee } from './employee/employee.model';
import { EmployeeService } from './employee/employee.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ModalService } from './employee/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeeComponent, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    public modalService: ModalService,
    public employeeApi: EmployeeService
  ) {}

  public onaddEmployee(addForm: NgForm) {
    document.getElementById('close-addForm')?.click();
    this.employeeApi.addEmployee(addForm.value).subscribe({
      next: (createdEmployee) => {
        this.employeeApi.employees.push(createdEmployee);
        addForm.reset();
      },
      error: (error) => alert(error.message),
    });
  }

  public onsearch(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employeeApi.employees) {
      if (
        employee.name?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    this.employeeApi.employees = results;
    if (this.employeeApi.employees.length == 0 || !key) {
      this.employeeApi.getEmployees();
    }
  }

  public updateEmployee(updatedEmployee: Employee) {
    document.getElementById('close-Form')?.click();
    this.employeeApi.updateEmployee(updatedEmployee).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => alert(error.message),
    });
  }

  public deleteEmployee(employeeId: number) {
    document.getElementById('closedeleteForm')?.click();
    this.employeeApi.deleteEmployee(employeeId).subscribe({
      next: (response) =>
        (this.employeeApi.employees = this.employeeApi.employees.filter(
          (emp: Employee) => emp.id !== employeeId
        )),
      error: (error) => alert(error.message),
    });
  }
}
