[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/veJTBc6h)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17071051)
## CS472-Homework-08-Express

## Exercise 01
Write an Express application to provide a calculator API. 
* There should be an API endpoint for each basic math operation: `addition`, `subtraction`, `multiplication`, `division`, and `modulus`. 
* Each endpoint will receive the input numbers and return a JSON response with the results as follows: `{results: number}`. 
* The calculator router should be designed with flexibility to receive the input numbers as query parameters, parameters, or in the body as JSON or urlEncoded format, For example, all of these requests will return the same results value `{results: 5}`:
  * `GET /addition/2/3`
  * `GET /addition/?a=2&b=3`
  * `POST /addition/` BODY `?a=2&b=3`
  * `POST /addition/` BODY `{a:2,b:3}`
* Use [morgan](https://www.npmjs.com/package/morgan) and print a log of all incoming requests to the console.
* Use [cors](https://www.npmjs.com/package/cors) and allow cross-origin requests to be shared.
  
## Exercise 02
This application reads/writes the state from/to [node-localstorage](https://www.npmjs.com/package/node-localstorage) which is used as a form of data storage. The application state is an array of numbers `number[]`. Create the following API end points as follows:
* `POST /numbers/:n` for adding an input number, return all saved numbers as a JSON. For example
  * `POST /numbers/1` -> `{ results: [1] }`
  * `POST /numbers/2` -> `{ results: [1,2] }`
  * `POST /numbers/5` -> `{ results: [1,2,5] }`
* `GET /numbers`, return the array of saved numbers -> `{ results: [1,2,5] }`
* `GET /numbers/:index`, return the array value at specified index
  * `GET /numbers/0` -> `{ results: 1 }`
  * `GET /numbers/1` -> `{ results: 2 }`
  * `GET /numbers/2` -> `{ results: 5 }`
* `DELETE /numbers/:index`, remove the number from the array at the specified index
  * `DELETE /numbers/1` -> `{ results: [1,5] }`
  * `DELETE /numbers/0` → `{ results: [5] }`
* `PUT /numbers/:index/:n`, change the number value in the array at the specified value
  * `PUT /numbers/0/10` -> `{ results: [10] }`
