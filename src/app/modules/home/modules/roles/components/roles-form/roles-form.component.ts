import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss']
})
export class RolesFormComponent implements OnInit {
  form = this.fb.group({
    name: [],
    moduleRights: this.fb.array([this.getModuleRightsControl()]),
    specialRights: this.fb.control([])
  });

  public get moduleRightsArrControl(): FormArray {
    return this.form.get('moduleRights') as FormArray;
  }
  constructor(private fb: FormBuilder) {
    console.log(this.form);
  }

  ngOnInit(): void {}

  private getModuleRightsControl(): FormGroup {
    return this.fb.group({
      module: ['', Validators.required],
      rights: this.fb.group({
        read: [false, Validators.required],
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
    console.log(this.form);
  }
}
