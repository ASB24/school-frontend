import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/interfaces';
import {FormBuilder, FormControl, FormControlName, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabelType} from '@angular/material/form-field';
import { SchoolService } from '../school.service';
import { MatTabGroup } from '@angular/material/tabs';
import { __values } from 'tslib';

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

  deleteStudent = this._formBuilder.group({
    floatLabel: this.floatLabelControl,
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    class: ['', Validators.required]
  });

  constructor(private _formBuilder: FormBuilder, private _SchoolService : SchoolService) { 
    this._SchoolService.selectedStudentChange.subscribe(student => {
      this.updateFormStudent = student
      this.operationsTabGroup.selectedIndex = 1
    })
  }

  _addStudent(){
    this._SchoolService.addStudent(this.addStudent.value as Student).subscribe(student => {
      this.addStudent.reset()

    })
  }

  _updateStudent(){
    this.updateFormStudent.name = this.updateStudent.value.name as string
    this.updateFormStudent.lastName = this.updateStudent.value.lastName as string
    this._SchoolService.updateStudent(this.updateFormStudent).subscribe(_ => this.updateStudent.reset())
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit(): void {
    this._SchoolService.getClasses().subscribe(classList => {
      this.classes = classList as string[]
      this.classes = [...new Set(this.classes)]
    })
  }

}
