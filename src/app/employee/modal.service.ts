import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public editemployee: Employee | any;
  public deleteEmploye: Employee | any;
  constructor() {}

  public openModal(employee: Employee | null, mode: string) {
    const maincontiner = document.getElementById('maincontainer');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editemployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmploye = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    maincontiner?.appendChild(button);
    button.click();
  }
}
