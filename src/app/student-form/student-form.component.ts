import { Component, OnInit } from '@angular/core';
import { Student } from 'src/interfaces';
import {FormBuilder, FormControl, FormControlName, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabelType} from '@angular/material/form-field';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent implements OnInit {

  classes : string[] = []

  formStudent : Student = {
    name: 'a',
    lastName: 'a',
    class: 'a'
  }

  floatLabelControl = new FormControl('auto' as FloatLabelType)
  options = this._formBuilder.group({
    floatLabel: this.floatLabelControl,
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    class: ['', Validators.required]
  });



  constructor(private _formBuilder: FormBuilder, private _SchoolService : SchoolService) { }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit(): void {
    this._SchoolService.getClasses().subscribe(classList => {
      this.classes = classList as string[]
    })
  }

}
