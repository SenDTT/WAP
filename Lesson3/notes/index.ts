type Student = {
    name: string;
    courses: string[];
};

const students: Student[] = [
    { name: "Alice", courses: ["Math", "Science"] },
    { name: "Bob", courses: ["English"] },
    { name: "Charlie", courses: ["Math", "History", "Art"] }
];

// Using flatMap to get a flat array of all courses
const allCourses = students.flatMap(student => student.courses);

console.log(allCourses); // Output: ["Math", "Science", "English", "Math", "History", "Art"]