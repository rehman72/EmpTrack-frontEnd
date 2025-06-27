import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  constructor(
    public employeeModal: ModalService,
    public employeeApi: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeApi.getEmployees();
  }
}
