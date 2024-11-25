[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/wdj-J8w2)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17032457)
## CS472-Homework-07-Node-Modules

## Exercise 01
Create a file `data.json` which contains the following JSON structure:
```json
[{"id": "tfHxMIRS-g7pX1rRLVzm0", "name": "Asaad Saad"}, {"id": "YdjFznHRgOi_UzYbXbLO0", "name": "Theo Saad"}]
```
* Create a class `Names`, once instantiated, it reads the JSON file synchronously, and assigns its content to a private property `data`.
* Create a method `persist()` to write back the instance property `data` back into the `data.json` file, and emit an event `data_saved` to confirm that the file is written successfully.  
* Create a method `addName(name: string)` to add a new name object to `data`, generate a new id using [nanoid](https://www.npmjs.com/package/nanoid) package, then persist the data changes to the hard drive in `data.json`.
* Create a method `getNames()` to return all names from `data`.  
* Create a method `getNameById(id: string)` to return the name of the provided `id`.
* Create a method `updateNameById(id: string, new_name: string)` to update the name property of the provided `id` from `data`, then persist the changes to the hard drive in `data.json`.
* Create a method `deleteNameById(id: string)` to remove the name object of the given `id` from `data`, then persist the changes to the hard drive in `data.json`.
  
Test your code: 
* create an instance of `Names` class.
* listen to `data_saved` event, and print a message `Data has been saved to data.json successfully`.
* call all the methods and test.
  
## Exercise 02
Create an **asynchronous** function `checkSystem()` that returns a promise and checks if the OS memory size is at least 8 GB and the processor has at least 4 cores (use `os` core module, which has the following methods: `cpus()` and `totalmem()`).  

* If the system doesn't have enough memory we should reject with a message: `You need at least 8 GB of RAM`
* If the system doesn't have at least 4 cores, reject with this message: `Processor must have at least 4 cores`
* If the system has enough specs, resolve with the following message `System is checked successfully.`  
  
Note: 1 KB is 1024 bytes, 1 MB is 1024 KB, 1 GB is 1024 MB.

## Exercise 03
* Create a folder `/input` and place 10 high-resolution photos from [Pexels](https://www.pexels.com/).
* Create an empty folder `/output`.
* Read Node documentation to learn about [working with folders in Node](https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs) using the `fs` core module.
* Write a script read the images' name in both the `/input` and `/output` folders, and determine the difference between them (files that exist in `/input` but does not exist in `/output`).
* If an image exists in `/input` and does not exist in `/output`, use [Sharp](https://www.npmjs.com/package/sharp) to resize the source image to a thumbnail size of 200 width, and save the thumbnail image in the `/output` folder.
* Use [Node Cron](https://www.npmjs.com/package/node-cron) to schedule a cron job using the following step value `*/30 * * * * *` that runs your script every 30 seconds.
  
Remember to install the definately typed (DT) package as a development dependency if the package does not provide types.

## Exercise 04
Environment variables hold secret keys and sensitive configuration data that we prefer to keep in a safe place. They are usually accessed from the `process.env` global object.
  
Update the previous exercise to send you an email with the following body:
```
From: Thumbnail Generator App
Subject: Status Report
Body: 
This is an automated email. 
The input folder has 31 thumbnails.
The output folder has 31 thumbnails.
Generated 0 new thumbnails. 
```
Use the [dotenv](https://www.npmjs.com/package/dotenv) module to save environment variables.  
Use the [@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail) module and integrate it with your application to send the status email.
