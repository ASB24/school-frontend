export interface Student {
    id?: number
    name: string
    lastName: string
    class: string
    createdAt?: string
    lastUpdatedAt?: string
}

export interface Grade {
    id?: number
    subject: string
    literal?: string
    studentID: number
    createdAt?: string
    lastUpdatedAt?: string
}

export interface GradeRow {
    gradeID: number
    studentID: number
    studentName: string
    studentLastName: string
    subject: string
    grade: string
    literal: string
}

export interface Attendance {
    id?: number
    attendanceDate: Date
    isPresent: boolean
    createdAt?: string
    lastUpdatedAt?: string
    studentID: number
}

export interface AttendanceRow {
    attendanceID: number
    studentID: number
    attendanceDate: Date
    studentName: string
    studentLastName: string
    isPresent: boolean
}