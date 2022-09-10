import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/interfaces';
import {FormBuilder, FormControl, FormControlName, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabelType} from '@angular/material/form-field';
import { SchoolService } from '../school.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent implements OnInit {

  classes : string[] = []
  
  floatLabelControl = new FormControl('auto' as FloatLabelType)

  addStudent = this._formBuilder.group({
    floatLabel: this.floatLabelControl,
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    class: ['', Validators.required]
  });

  updateStudent = this._formBuilder.group({
    floatLabel: this.floatLabelControl,
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    class: ['', Validators.required]
  });
  updateFormStudent : Student = {} as Student
  @ViewChild("operations", { static: false })
  operationsTabGroup! : MatTabGroup

  constructor(private _formBuilder: FormBuilder, private _SchoolService : SchoolService) { 
    this._SchoolService.selectedStudentChange.subscribe(student => {
      this.updateFormStudent = student
      this.operationsTabGroup.selectedIndex = 1
    })
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit(): void {
    this._SchoolService.getClasses().subscribe(classList => {
      this.classes = classList as string[]
    })
  }

}
