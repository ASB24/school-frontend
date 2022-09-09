import { Component, OnInit } from '@angular/core';
import { Student } from 'src/interfaces';
import {FormBuilder, FormControl} from '@angular/forms';
import {FloatLabelType} from '@angular/material/form-field';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent implements OnInit {

  classes : string[] = []

  inputStudent : Student = {
    name: 'a',
    lastName: 'a',
    class: 'a'
  }

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    floatLabel: this.floatLabelControl,
  });

  constructor(private _formBuilder: FormBuilder) { }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit(): void {
  }

}
