export interface Student {
    id?: number
    name: string
    lastName: string
    class: string
    createdAt?: Date
    lastUpdatedAt?: Date
}

export interface Attendance {
    id?: number
    attendanceDate: Date
    isPresent: boolean
    createdAt?: Date
    lastUpdateAt?: Date
    studentID: number
}

export interface AttendanceRow{
    id?: number
    attendanceDate: Date
    studentID: number
    studentName: string
    studentLastName: string
    isPresent: boolean
    createdAt?: Date
    lastUpdateAt?: Date
}