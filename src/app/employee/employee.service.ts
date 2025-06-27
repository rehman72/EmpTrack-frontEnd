import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;
  public employees: Employee[] | any;

  constructor(private http: HttpClient) {}

  public getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      `${this.apiServerUrl}/employee/add`,
      employee
    );
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.apiServerUrl}/employee/update`,
      employee
    );
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/employee/delete/${employeeId}`
    );
  }
  public getEmployees(): void {
    this.getEmployee().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
