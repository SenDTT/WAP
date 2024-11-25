// exercise 3

export type Student = { student_id: string, firstname: string; lastname: string; grade: number; };
type Course = Record<string, { title: string, students: Student[]; }>; // example: { 'CS472': { title: 'Web Application Programming', students: [] }}

export class Exercise3 {
    #courses: Course[] = [];

    add_course(course_code: string, course_title: string): boolean {
        // add if course code does not exist
         if (this.#courses.some(course => course[course_code])) {
            return false;
        }
        this.#courses.push({ [course_code]: { title: course_title, students: [] } });
        return true;
    }

    update_course_title(course_code: string, new_course_title: string): boolean {
        // return true if the course's title is updated successfully, false otherwise
        const course = this.#courses.find(course => course[course_code]);
        if (!course) {
            return false;
        }
        course[course_code].title = new_course_title;
        return true;
    }

    delete_course(course_code: string): boolean {
        const index = this.#courses.findIndex(course => course[course_code]);
        if (index === -1) {
            return false;
        }
        this.#courses.splice(index, 1);
        return true;
    }

    get_course_title_by_code(course_code: string): string {
        // return the course title
        const course = this.#courses.find(course => course[course_code]);
        if (!course) {
            return '';
        }
        return course[course_code].title;
    }

    enroll_student_in_course(course_code: string, student: Partial<Student>): boolean {
        // enroll if student hasn't been previously enrolled, note that you will receive a student object without grade, set the grade to 0
        // return true if the student is enrolled successfully, false otherwise
        const course = this.#courses.find(course => course[course_code]);

        if (!course || !student.student_id) {
            return false;
        }
        course[course_code].students.push({ ...student, grade: 0 } as Student);
        return true;
    }

    remove_student_from_course(course_code: string, student_id: string): boolean {
        // return true if the student is removed from course successfully, false otherwise
        const course = this.#courses.find(course => course[course_code]);

        if (!course || !student_id) {
            return false;
        }

        const index = course[course_code].students.findIndex(student => student.student_id === student_id);
        if (index === -1) {
            return false;
        }
        course[course_code].students.splice(index, 1);

        return true;
    }

    update_student_grade(course_code: string, student_id: string, grade: number): boolean {
        // update the student grade
        // return true if the student's grade is updated successfully, false otherwise
        const course = this.#courses.find(course => course[course_code]);
        if (!course || !student_id) {
            return false;
        }
        const student = course[course_code].students.find(student => student.student_id === student_id);
        if (!student) {
            return false;
        }
        student.grade = grade;
        return true;
    }

    get_student_grade(course_code: string, student_id: string): number {
        const course = this.#courses.find(course => course[course_code]);
        if (!course || !student_id) {
            return 0;
        }
        const student = course[course_code].students.find(student => student.student_id === student_id);
        if (!student) {
            return 0;
        }
        return student.grade;
    }
}
