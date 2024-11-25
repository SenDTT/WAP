demo: http://35.202.53.171/

## CS472-Final-Project-November-2024 
### Policies for the Students: Policies for a Better Campus Experience
The requirements below are for the standalone project. For groups, please refer to the additional requirements section below.  
  
You will build a full-stack web application using React for the frontend and Express for the backend. The project will focus on state management, API interactions (REST), and component-based architecture.
* The application displays policies from all users by calendar year, sorted by votes in descending order.
* The application should provide ways to browse previous academic years (history).
* Guests can browse policies, but cannot add a new policy.
* Implement signup/signin and save the user state at the client.
* Only users can contribute and submit a new policy.
* A policy consists of a title, description, owner, date, and category (General, Food, Library, Meditation, Education, Visa & Travel, Students Lounge.. etc).
* A policy can be up-voted by users, once per policy. Guests cannot up-vote.
* For the protected actions (Add policy, Up-Vote), implement a middleware at the server to verify the user registration state.
  
## Frontend (React) Technical Requirements
* Create a well-structured component hierarchy.
* Use functional components and hooks (e.g., useState, useEffect, useContext).
* Utilize React Context API for passing global state between components.
* Implement controlled components for forms and inputs.
* Handle loading and error states appropriately.
* Design a user-friendly interface using a CSS framework (e.g., Tailwind CSS) or similar CSS libraries.
* Use React Router DOM to manage navigation.
  
## Backend (Express) Technical Requirements
* Create RESTful API endpoints to handle frontend requests and setup routes for different endpoints (e.g., GET, POST, PUT).
* Create a middleware to verify the user registration state before allowing access to the protected routes (add policy, up-vote).
* Use morgan middleware for logging requests and handling errors.
* Use cors to allow communication between the frontend and backend applications on different ports.
* Use `node:fs` to store and manage the policies as files on the file system. If you have strong DBMS skills (for example [MySQL](https://www.npmjs.com/package/mysql2), you may use it for storage instead of node file system.

## Group Project Requirements (Does not apply to students who work standalone)
Standalone students are welcome to work on these requirements, but they will not be evaluated or receive extra credits for these requirements. Groups are subject to pre-approval, if you wish to work as a group, please send me your team members' names before 12:00 PM noon of Nov 15 and I will review your request and approve your team formation. Groups must have two students only.       
  
In addition to the previous requirements, groups must complete the following requirements:
* Allow users to add comments to policies. Multiple comments are allowed.
* Create additional screen to show the policies posted by the current user.
* Implement a search feature to allow guests/users to search for a policy by title.
* In addition to displaying policies by number of votes, provide guests/users the ability to filter policies by category, and by date latest to oldest.  
  
Note that you have "admin" priviledge on your Git repository, one member of the group should add the other member to collaborate on one repository.

## Bonus (2 extra points)
* Deploy the frontend on a service like Netlify, Vercel, or any other similar service.
* Deploy the backend on a service like Heroku, Render, or any other similar service.
* Provide links to the deployed applications.

## Evaluation Criteria
* Does the application meet all specified requirements?
* Are all features implemented and working correctly?
* Is the code well-organized and easy to understand?
* Are best practices followed for both React and Express?
* Is the user interface intuitive and visually appealing?

### Notes
* A commit per feature is required, with a meaningful commit message.
* A daily push is required to track your code progress and measure your performance.
* You may only use and submit code to the repository provided by `maharishi-university` organization, do not submit code to your personal repository.
* Students are expected to be available on MS-Teams to receive calls and check on their progress every day from 10:00 AM to 12:00 PM, and 2:00 PM to 3:00 PM during the project.

## Need assistance?
Feel free to contact me any day between 10:00 AM to 12:00 PM, and 2:00 PM to 5:00 PM, except for Sunday. I’m available to assist all teams with all kinds of requests (system design, backend, frontend, fixing code bugs.. etc). The project is a learning experience and I want everyone to finish the project successfully and meet the course learning outcomes.

## Final Evaluation 
* The submission deadline is on Wednesday at 9:00 PM. There will be no presentation. I might invite you to a meeting after the final exam to discuss your project if needed.
* It's advised that you submit your code on Wednesday morning, and prepare for your final exam.
* Your final exam will be on Thursday, from 10:00 AM to 12:00 PM, in the Foster 336 classroom. Time management is key, finish your project early to allow time for exam preparation.

Good luck, and happy coding!

_Code Honor Submission Policy: Remember to respect the code honor submission policy. All written code must be original. You may not share any part of your code with other students. Code duplications will results to receiving NC for the final project. Presenting any code as one’s own work when it came from another source is plagiarism, which includes any matching patterns and code snippets, and will affect your grade. The use of AI is not permitted in this assignment. For more details, check the full course policies in the syllabus._
