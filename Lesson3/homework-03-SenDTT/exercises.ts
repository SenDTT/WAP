// Exercise 02: create secondLargest function
const secondLargest = (nums: number[]): number => {
    if (nums.length < 2) {
        throw new Error("The length of array should be greater than one");
    }

    let firstMax: number = Math.max(nums[0], nums[1]);
    let secondMax: number = Math.min(nums[0], nums[1]);

    for (let num of nums) {
        if (num > firstMax) {
            secondMax = firstMax;
            firstMax = num;
        } else if (num > secondMax && num != firstMax) {
            secondMax = num;
        }
    }

    return secondMax;
}
console.log(secondLargest([20 ,120 ,111 ,215 ,54 ,78])); // Output: 120

// Exercise 3
// a: use Array.map()
const squaresOfNums = (nums: number[]): number[] => {
    return nums.map(num => num * num);
}
console.log(squaresOfNums([1, 2, 3, 4, 5]));
// b: use Array.filter()
const allEvenNums = (nums: number[]): number[] => {
    return nums.filter(num => num % 2 == 0);
}
console.log(allEvenNums([1, 2, 3, 4, 5, 6, 3, 12, 9, 20]));

// Exercise 4: using rest operator
const sumAllArguments = (...num: number[]): number => {
    return num.reduce((sum, cur) => sum + cur, 0);
}
console.log(sumAllArguments(1, 2, 3, 4, 5)); 

// Exercise 5: use spread operator to concatenate them into a single array.
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log([...arr1, ...arr2]);

// Exercise 6
interface Person {
    name: string;
    age: number;
    isStudent: boolean;
}

function describePerson(person: Person): string {
    return `${person.name} is ${person.age} years old and is${person.isStudent ? '' : ' not'} a student.`;
}

const person: Person = { name: "Alice", age: 25, isStudent: true };
console.log(describePerson(person)); // Output: "Alice is 25 years old and is a student."

(function() {
    console.log("This is an example for an IIFE");
})();