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
    private employeeApi: EmployeeService
  ) {}

  public onaddEmployee(addForm: NgForm) {
    document.getElementById('close-addForm')?.click();
    this.employeeApi.addEmployee(addForm.value).subscribe({
      next: (response) => {
        console.log(response);
        addForm.reset();
      },
      error: (error) => alert(error.message),
    });
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

  public deleteEmployee(employee: number) {}
}
