import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as Models from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private APIURL : string = "https://localhost:7296/api/"
  private APIURL_STUDENTS : string = this.APIURL+"Students/"
  private APIURL_GRADES : string = this.APIURL+"Grades/"
  private APIURL_ATTENDANCES : string = this.APIURL+"Attendances/"
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http : HttpClient) { }

  getClasses() : Observable<string[] | Models.Student[]> {
    return this.http.get<Models.Student[]>(this.APIURL_STUDENTS)
      .pipe(
        tap(_ => console.log('got classes')),
        map((studentList) => studentList.map(student => student.class)),
        catchError(this.handleError<Models.Student[]>('GetStudents', []))
      )
  }

  // GET Students
  getStudents() : Observable<Student[]> {
    return this.http.get<Student[]>(this.APIURL_STUDENTS)
      .pipe(
        tap(_ => console.log('Found students')),
        catchError(this.handleError<Student[]>('GetStudents', []))
      )
  }

  // GET Student by ID
  getStudent(id: number) : Observable<Student> {
    const endpoint = this.APIURL_STUDENTS+"?id="+id
    return this.http.get<Student>(endpoint)
      .pipe(
        tap(_ => console.log(`Fetched student with ID: ${id}`)),
        catchError(this.handleError<Student>(`getStudent ID: ${id}`))
      )
  }

  // POST Student
  addStudent(student : Student) : Observable<Student>{
    return this.http.post<Student>(this.APIURL_STUDENTS, student, this.httpOptions)
      .pipe(
        tap((student: Student) => {
          console.log(`Added student with ID: ${student.id}`)
        }),
        catchError(this.handleError<Student>('addStudent'))
      )
  }

  // PUT Student
  updateStudent(student : Student) : Observable<any>{
    return this.http.put(this.APIURL_STUDENTS, student, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Updated student with ID: ${student.id}`)),
        catchError(this.handleError<any>('updateStudent'))
      )
  }

  // DELETE Student
  deleteStudent(id: number) : Observable<any>{
    return this.http.delete<Student>(this.APIURL_STUDENTS+"?id="+id)
      .pipe(
        tap(_ => console.log(`Deleted student with ID: ${id}`)),
        catchError(this.handleError<any>('deleteStudent'))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
