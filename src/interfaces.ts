export interface Student {
    id?: number
    name: string
    lastName: string
    class: string
    createdAt?: string
    lastUpdatedAt?: string
}

export interface Attendance {
    id?: number
    attendanceDate: Date
    isPresent: boolean
    createdAt?: string
    lastUpdateAt?: string
    studentID: number
}

export interface AttendanceRow{
    id?: number
    attendanceDate: Date
    studentID: number
    studentName: string
    studentLastName: string
    isPresent: boolean
    createdAt?: string
    lastUpdateAt?: string
}