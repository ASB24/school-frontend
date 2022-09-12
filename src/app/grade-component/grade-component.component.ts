import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Grade, Student } from 'src/interfaces';
import { SchoolService } from '../school.service';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-grade-component',
  templateUrl: './grade-component.component.html',
  styleUrls: ['./grade-component.component.sass']
})
export class GradeComponentComponent implements OnInit {

  private readonly gradeLimits = [Validators.required, Validators.max(100), Validators.min(0)]
  studentGradeForm = this.formBuilder.group({
    studentID: [0, this.gradeLimits],
    spanishGrade: [0, this.gradeLimits],
    mathGrade: [0, this.gradeLimits],
    socialGrade: [0, this.gradeLimits],
    naturalGrade: [0, this.gradeLimits]
  })
  spanishGradeLiteral : string = ''
  mathGradeLiteral : string = ''
  socialGradeLiteral : string = ''
  naturalGradeLiteral : string = ''

  studentList : Student[] = []
  selectedStudentGradeList : Grade[] = []

  constructor(private formBuilder : FormBuilder, private schoolService: SchoolService) { 
    this.schoolService.getStudents().subscribe(list => this.studentList = list)
  }

  ngOnInit(): void {
  }

  submitGrades(){
    if(this.selectedStudentGradeList.length === 0){
      this.schoolService.addGrade({
        studentID: parseInt(this.studentGradeForm.controls['studentID'].value!.toString()),
        subject: 'Spanish',
        gradeScore: parseInt(this.studentGradeForm.controls['spanishGrade'].value!.toString())
      }).subscribe()
      this.schoolService.addGrade({
        studentID: parseInt(this.studentGradeForm.controls['studentID'].value!.toString()),
        subject: 'Math',
        gradeScore: parseInt(this.studentGradeForm.controls['mathGrade'].value!.toString())
      }).subscribe()
      this.schoolService.addGrade({
        studentID: parseInt(this.studentGradeForm.controls['studentID'].value!.toString()),
        subject: 'Social Studies',
        gradeScore: parseInt(this.studentGradeForm.controls['socialGrade'].value!.toString())
      }).subscribe()
      this.schoolService.addGrade({
        studentID: parseInt(this.studentGradeForm.controls['studentID'].value!.toString()),
        subject: 'Natural Sciences',
        gradeScore: parseInt(this.studentGradeForm.controls['naturalGrade'].value!.toString())
      }).subscribe()
    }else{
      this.schoolService.updateGrade({
        id: this.selectedStudentGradeList.find(grade => grade.subject === "Spanish")!.id,
        studentID: parseInt(this.studentGradeForm.controls['studentID'].value!.toString()),
        subject: 'Spanish',
        gradeScore: parseInt(this.studentGradeForm.controls['spanishGrade'].value!.toString())
      }).subscribe()
      this.schoolService.updateGrade({
        id: this.selectedStudentGradeList.find(grade => grade.subject === "Math")!.id,
        studentID: parseInt(this.studentGradeForm.controls['studentID'].value!.toString()),
        subject: 'Math',
        gradeScore: parseInt(this.studentGradeForm.controls['mathGrade'].value!.toString())
      }).subscribe()
      this.schoolService.updateGrade({
        id: this.selectedStudentGradeList.find(grade => grade.subject === "Social Studies")!.id,
        studentID: parseInt(this.studentGradeForm.controls['studentID'].value!.toString()),
        subject: 'Social Studies',
        gradeScore: parseInt(this.studentGradeForm.controls['socialGrade'].value!.toString())
      }).subscribe()
      this.schoolService.updateGrade({
        id: this.selectedStudentGradeList.find(grade => grade.subject === "Natural Sciences")!.id,
        studentID: parseInt(this.studentGradeForm.controls['studentID'].value!.toString()),
        subject: 'Natural Sciences',
        gradeScore: parseInt(this.studentGradeForm.controls['naturalGrade'].value!.toString())
      }).subscribe()
    }
    this.studentGradeForm.reset()
  }

  changeLiteral(subject: string){
    if(subject === 'spanish') {
      const value = this.studentGradeForm.controls.spanishGrade.value
      if(value) this.spanishGradeLiteral = this.getLiteral(value)
    }else if(subject === 'natural') {
      const value = this.studentGradeForm.controls.naturalGrade.value
      if(value) this.naturalGradeLiteral = this.getLiteral(value)
    }else if(subject === 'social') {
      const value = this.studentGradeForm.controls.socialGrade.value
      if(value) this.socialGradeLiteral = this.getLiteral(value)
    }else if(subject === 'math') {
      const value = this.studentGradeForm.controls.mathGrade.value
      if(value) this.mathGradeLiteral = this.getLiteral(value)
    }
  }

  getGrades(studentID: number | undefined){
    if(studentID != undefined)
      this.schoolService.getGrades(studentID).subscribe(gradeList => {
        this.selectedStudentGradeList = gradeList
        gradeList.forEach(grade => {
          if(grade.subject === 'Spanish'){
            this.studentGradeForm.controls.spanishGrade.setValue(grade.gradeScore)
          }else if(grade.subject === 'Math'){
            this.studentGradeForm.controls.mathGrade.setValue(grade.gradeScore)
          }else if(grade.subject === 'Social Studies'){
            this.studentGradeForm.controls.socialGrade.setValue(grade.gradeScore)
          }else if(grade.subject === 'Natural Sciences'){
            this.studentGradeForm.controls.naturalGrade.setValue(grade.gradeScore)
          }
        })
      })
  }

  getLiteral(grade: number) : string{
    if(grade <= 100 && grade >= 90) return 'A'
    else if(grade >= 80) return 'B'
    else if(grade >= 70) return 'C'
    else return 'F'
  }

}
