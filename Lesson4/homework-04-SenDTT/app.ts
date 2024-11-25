// Exercise 01
console.log("// Exercise 01");
import { add_item, delete_item_by_id, get_item_title_by_id, get_items, update_item_title_by_id } from "./exercise-01";
console.log(get_items());
console.log(add_item({id: '1', title: "Item 1"}));
console.log(get_items());
console.log(add_item({id: '1', title: "Item 1"}));
console.log(get_items());
console.log(add_item({id: '2', title: "Item 2"}));
console.log(get_items());
console.log(update_item_title_by_id('1', "Item 1 - Edited"));
console.log(get_items());
console.log(delete_item_by_id('1'));
console.log(get_items());
console.log(delete_item_by_id('3'));
console.log(get_items());
console.log(get_item_title_by_id('2'));

// Exercise 02
console.log("\n// Exercise 02");
import { Exercise2 } from "./exercise-02";
let obj = new Exercise2();
console.log("add_movie_in_genre: " , obj.add_movie_in_genre('thriller', {id: '3', title: "Movie 03"}));
console.log(obj.get_movie_title_by_id('thriller', '3'));
console.log(obj.get_movie_title_by_id('cartoon', '3'));
console.log("add_movie_in_genre: ",obj.add_movie_in_genre('cartoon', {id: '1', title: "Movie 03"}));
console.log("update_movie_title_by_genre_and_movie_id: ", obj.update_movie_title_by_genre_and_movie_id('cartoon', '1', 'Movie 001'));
console.log(obj.get_movie_title_by_id('cartoon', '1'));
console.log("delete_movie_by_genre_and_movie_id: ", obj.delete_movie_by_genre_and_movie_id('cartoon', '1'));
console.log(obj.get_movie_title_by_id('cartoon', '1'));
console.log("add_movie_in_genre: ",obj.add_movie_in_genre('cartoon', {id: '3', title: "Movie 03"}));
console.log(obj.get_movie_title_by_id('cartoon', '3'));

// Exercise 03
console.log("\n// Exercise 03");
import { Exercise3, Student } from "./exercise-03";
let obj3 = new Exercise3();
console.log("course: ", obj3.get_course_title_by_code('CS472'));
console.log("add_course: ", obj3.add_course('CS472', 'WAP'));
console.log("course: ", obj3.get_course_title_by_code('CS472'));
console.log("add_course: ", obj3.add_course('CS432', 'WAA2'));
console.log("add_course: ", obj3.add_course('CS422', 'MWA'));
console.log("course: ", obj3.get_course_title_by_code('CS432'));
console.log("update_course_title: ", obj3.update_course_title('CS432', 'WAA'));
console.log("course: ", obj3.get_course_title_by_code('CS472'));
console.log("delete_course: ", obj3.delete_course('CS422'));
console.log("course: ", obj3.get_course_title_by_code('CS422'));
let student: Student = {student_id: '1', firstname: "James", lastname: "Thomas", grade: 3};
console.log("enroll_student_in_course: ", obj3.enroll_student_in_course('CS472', student));
let student2: Student = {student_id: '2', firstname: "Tim", lastname: "Son", grade: 3};
console.log("enroll_student_in_course: ", obj3.enroll_student_in_course('CS472', student2));
console.log("course: ", obj3.get_course_title_by_code('CS472'));
console.log("remove_student_from_course: ", obj3.remove_student_from_course('CS472', '1'));
console.log("get_student_grade: ", obj3.get_student_grade('CS472', '2'));
console.log("update_student_grade: ", obj3.update_student_grade('CS472', '2', 10));
console.log("get_student_grade: ", obj3.get_student_grade('CS472', '2'));