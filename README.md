# Understanding Asynchronous Code

Not all Javascript code happens in the order it's written - it is often **asynchronous**, as Javascript will continue to execute subsequent functions if previous calls need to wait for a response. We have many tools we can utilise to handle this, and this sprint focuses on **callbacks**.

Callbacks are a common way that programmers can work with results from asynchronous functions, and underlie all other methods of handling asynchronous code. A callback is a function passed elsewhere to be invoked, allowing data to be passed back to the original function. During this sprint we will focus on the core concepts of async code. You will make calls to other functions that have already been written for you - it's your job to tie the functions together to return the response we're looking for.

## Objectives

1.  To understand the mechanisms and terminology of asynchronous code.
2.  Using TDD to ensure we're writing quality code.

## Functions Available To You

Don't worry about the utils folder. Pretend that these functions are third-party APIs that you are requesting data from and that will respond after a short period of time.

These are the functions available to you and a sample response from each one:

```js
getSuperHeroes(your callback here) //=> [returns an array of superhero names]

getArchEnemy(hero, yourCallbackHere); //=> 'villain name'

getFile(filename, yourCallbackHere); //=> 'File contents of filename'

getFileMany(filename, yourCallbackHere); //=> Your callback will be called multiple times
```

## Stage 1

1.  Write a function `blockingEcho` that takes a string. It then waits three seconds from now, using a while loop, and then returns the string.

This is called 'blocking code' as it will not let Javascript run any other code while it waits. Call it three times in a row to see how long it takes. Clearly, this is not optimal.

2.  Asychronous code allows Javascript to continue running whilst waiting on results. Rewrite the previous function, call it `asyncEcho` and use setTimeout. It should take a string and an error-first callback as its arguments. This is now non-blocking code - Javascript will deal with other things and then, when the timer ends, it will deal with the callback. Call this function three times to see how long it takes.

3.  Write a function called `fetchSuperHeroes`. It will need to take an error-first callback as its only argument. This function will need to invoke our `getSuperHeroes` function and, once it has received a response, it will capitalise each superhero name. Finally, invoke the callback with an array of capitalised superhero names.

4.  Write a function called `fetchOpponents` that takes an error-first callback function, and will use the `fetchSuperHeroes` function you just wrote to get an array of capitalised superheroes. It then needs to invoke our function `getArchEnemy` with each of the superhero names. As you start receiving results from `getArchEnemy`, build up an array of objects with hero and villain properties. Once you have had all the responses from `getArchEnemy`, invoke your callback with your array of objects sorted alphabetically by superhero name. Example:
    `[{hero: 'BATMAN', villain: 'THE JOKER'}, {hero: 'CAPTAIN AMERICA', villain: 'RED SKULL'}, ...]`
    The array will take some time to build with the results of multiple calls to the villain database. **How will you know when it is ready to invoke the callback?**

## Stage 2

This section considers some of the issues that callbacks and asynchronous code may face.

5.  Write a function called `fetchContentOfFiles` that takes an array of file names and an error-first callback. It will need to invoke `getFile(fileName, yourCallbackFunction)` for each file in the array. It then needs to collect all the responses and, once it has received the final response, it will need to invoke the callback in the order they were requested - not in the order they were returned in.**How will you keep track of the order of responses?**

6.  Write a function called `fetchFilesAndLog`. It takes an array of file names and an error-first callback. It needs to invoke `getFile(fileName, yourCallbackFunction)` for each file in the array. It must log the results in the order they were requested and as soon as possible. If we have files 1, 2, 3 and 4, and 1 comes back first, we can log 1. If 3 then comes back, we need to wait until 2 has come back, and then log 2 and 3, and then 4 when we have the response. Once all the responses have been received, it needs to invoke the callback with the string 'Complete!'

This is a useful technique in terms of user design - it can make loading times seem faster when the user gets the information they have requested sooner than if they had had to wait for the whole collection of responses.

7.  Multiple callbacks can be problematic - a credit card validation, for example, risks taking payment multiple times. Write a function called `fetchFileWithSingleCall` that takes a filename and an error-first callback. This function will need to invoke `getFileMany(fileName, yourCallbackFunction)`. You need to ensure this callback is only called once. You have written a lowbar function that may help with this.

## Stage 3

Build a project generator. The goal is to be able to use the terminal command `$generate my_new_project` and it should create a directory with the project's name in your current location, then fill it with the necessary files to start a basic JS project.
These should include:

* an index.js
* a spec folder
* an index.spec.js
* a package.json set up with the basic dependencies and scripts
* a README.md file
* an eslint config file
* a .gitignore file
* a git repo initialised
  In order to do this you will need to utilise the **File System** module available in Node. Only use the asynchronous methods - any ending in 'sync' are not allowed.

A big part of problem solving is reading documentation and establishing what you will need and how to use it - here is the [documention for Node's File System module](https://nodejs.org/api/fs.html). You'll also have to research how to install your program on your computer to make the generate command globally available from your terminal.

**Advanced Features**

* Configure your generator to automatically run npm install when used, installing all the packages listed in the package.json.
* If called like so: generate [project name][github http], it should automatically add the github http as a remote.
* It should perform an inital commit with the message 'initial commit' and push it to your github on the link provided.
* Explore how you could add interactivity purely with Node, i.e. ask the user to input the name of the project on the console or select between a choice of project templates.
