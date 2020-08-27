import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RolesService } from '../../roles.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss']
})
export class RolesFormComponent implements OnInit {
  public form = this.fb.group({
    name: ['', Validators.required],
    moduleRights: this.fb.array([this.getModuleRightsControl()]),
    specialRights: this.fb.control(undefined) // change this control based on using multiSelect or select
  });
  public submitted = false;
  public error;
  public response;

  public get moduleRightsArrControl(): FormArray {
    return this.form.get('moduleRights') as FormArray;
  }
  constructor(private fb: FormBuilder, private roleService: RolesService) {}

  ngOnInit(): void {}

  private getModuleRightsControl(): FormGroup {
    return this.fb.group({
      module: ['', Validators.required],
      rights: this.fb.group({
        read: [false, [Validators.required, Validators.requiredTrue]],
        create: [false, Validators.required],
        update: [false, Validators.required],
        delete: [false, Validators.required]
      })
    });
  }
  public addModuleRights(): void {
    this.moduleRightsArrControl.push(this.getModuleRightsControl());
  }
  public removeModuleRights(index): void {
    this.moduleRightsArrControl.removeAt(index);
  }

  public submitForm(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
    this.error = null;
    this.response = null;
    if (this.form.invalid) {
      return;
    }
    this.roleService.saveRole(this.form.value).subscribe(
      response => (this.response = response),
      error => (this.error = error.statusText)
    );
  }
}
