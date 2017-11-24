# Understanding Async

Not all JavaScript code happens in order - it is often **asynchronous**, and we need to know how to deal with this. We have many tools that we can utilise, and this sprint focuses on the bread and butter: callbacks.

Callbacks are currently the most common way that programmes can work with results from asyncronous functions/code. To recap on today's lecture, a callback is a function that may be invoked at some point in the future.

For this sprint, we are going to focus on the core concepts of async code. Some of the async functions are made for you but as developers, it is our job to tie these functions together to get the results we are after.

## Objectives

1. Learn to think asyncronously and be able to work with async functions. 
2. Learn how to write effective async code and understand the mechanisms and terminology behind this.
3. Continue to use TDD to make sure we are writing quality code
4. Learn about async.js library

## Rules

You do not need to look in the utils folder. You should consider its contents as third party APIs that respond after a period of time. As with the APIs you will be dealing with for the rest of the course, the only thing you will know about them is what the documentation (I.e. this README) tells you.

To make life easier, we have written the basic tests.

## Functions available to you

    getSuperHeroes(yourCallbackHere) //=> [returns an array of superhero names]
    getArchEnemy(hero, yourCallbackHere) //=> 'villain name'
    getFile(filename, yourCallbackHere) //=> 'File contents of filename'
    getFileNoRes(filename, yourCallbackHere) //=> Your callback will never be called
    getFileMany(filename, yourCallbackHere) //=> Your callback will be called multiple times
    getPizzaById(id, yourCallbackHere) //=> {id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato']}
    getLocalPizzaShops(yourCallbackHere) //=> [{id: 1, name: 'Adrians Pizza Place'}]
    getPizzasForShopId(shopId, yourCallbackHere) //=> [{id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato']}]

## Stage 1

1. Write a function `blockingEcho` that takes a string. It then waits 3 seconds using a loop and returns the string. This is called blocking code as it will not let JavaScript run any other code whilst it waits. If you want, try calling this code 3 times in a row and see how long it takes. This is a painful way to code.

2. JavaScript uses async code to allow it to do things whilst waiting for results. Try doing the same function using setTimeout. Call it `asyncEcho`. This time it will need to take a string and an error-first callback as arguments. This is non-blocking as JS is able to deal with other things and when the timer ends, it is able to then deal with the callback. Again, try calling this function 3 times and see how long it takes. This way is a lot less CPU intensive and frees up JS to deal with other stuff while it waits.

3. Write a function called `fetchSuperHeroes`. It will need to take an error-first callback as its only argument. This function needs to invoke the `getSuperHeroes` function and once it has received a response, it will capitalise the superhero names and invoke the callback with an array of capitalised superheroes.

4. Write a function called `fetchOpponents` that takes a error-first callback function and uses the function you just wrote to get an array of capitalised superheroes. It then needs to invoke `getArchEnemy` with each capitalised superhero name. As you start receiving results from `getArchEnemy`, build up an array of objects with hero and villain properties. Once you have had all the responses from `getArchEnemy`, invoke your callback with this array of hero/villain objects. i.e.

```[{hero: 'BATMAN', villain: 'THE JOKER'}, {hero: 'CAPTAIN AMERICA', villain: 'RED SKULL'}, ...]```

Here we will need to compose several async calls to build up the result and when ready, call the final callback with the built up array. The call to ```getArchEnemy``` is async so think about how you will know when it is time to invoke your callback with the array.

## Stage 2

This section considers some of the issues that callbacks and asyncronous code may face.

5. Write a function called `fetchContentOfFiles` that takes an array of file names and an error-first callback. It will need to invoke `getFile(fileName, yourCallbackFunction)` for each file. The function will need to collect up all of the responses and once it has received the final response, it will need to invoke the callback to with the array of responses in order they were requested in (not the order they are returned in).

The main issue here is being able to keep track of what response goes in which index as responses may not come back in order. The file names are arbitrary, so you can use whatever you as file names. Try using 5+ items in your array for tests.

6. Write a function called `fetchFilesAndLog`. It needs to take an array of file names and an error-first callback. This function will need to invoke `getFile(fileName, yourCallbackFunction)` for each file. This function must log the results in order that they are requested in and as soon as possible. So for example if we have files 1, 2, 3, 4. If 1 comes back first it will log 1, then if 3 comes back it will wait for 2 and then log 2 and 3. Then log 4 when it gets its response. Once all responses have been received, it needs to invoke the callback with the string 'Complete!';

This is a useful in the wild as it can help get feedback to the user earlier and make loading seem faster. I.e. if you were waiting for a page to load and it logged each as they came in, it would feel faster than waiting until everything had been received and logged them all at once. To be able to test this you will need to use a sinon spy function to 'wrap' the console.log method.

8. Write a function called `fetchFileWithSingleCall` that takes a filename and an error-first callback. This function will need to invoke `getFileMany(fileName, yourCallbackFunction)`. As this function is designed to 'accidentally' call your callback multiple times, you need to guard against this, as in some cases, you need to ensure this callback isn't called more than once: imagine a function that once a credit-card details are validated, it calls the callback. This callback could be a take payment callback and if this creditCardValidation function calls the callback multiple times, it could charge a client several times accidentally. Sad times. There's a lowbar function you made that you could look to for inspiration here...

## Stage 2.5 - an optional detour

Stage 3 gets pretty complex and conceptual, so if you want to take on a more practical project that could actually make your lives easier for the remainder of the course, you may want to look at this instead.

Your aim is to build a project generator. The end goal is to be able to be able to use the terminal command ```$ generate my_new_project``` and it should create a directory with the project's name in your current location, and fill it with all the necessary files to start a basic JS project.


These files should include:

• an index.js
• a spec folder
• an index.spec.js
• a package.json set up with the basic dependencies and scripts
• a README.md file
• an eslint config file
• a .gitignore file
• a git repo initialised

In order to do this, you will need to utilise the file sytem. A **File System** module is available in Node, and you can read about it in the docs.

In order to revise your understanding of async, you should only use async methods. **Therefore any function ending in 'sync' is not allowed.**

Note: a big part of problem solving is being able to read documentation, and establish what you're going to need and how you're going to use it.

You will also have to research how to install your program on your computer to make the generate command globally available from your terminal.

**Advanced Features**

• Configure your generator to automatically run npm install when used, installing all the packages listed in the package.json.
• If called like so: generate [project name] [github http] it should automatically add the github http as a remote.
• It should do an inital commit with the message initial commit and push it to your git hub on the link provided.
• Explore how you could add interactivity purely with Node, i.e. ask the user to input the name of the project on the console or select between a choice of project templates

## Stage 3

This section looks at the [async.js](https://caolan.github.io/async/). It is a bit like underscore/lodash but it works for async methods which comes in handy to manage async behaviour. Now theres lots it can do but there are some methods that are pretty useful to know about from the start;

* There is an each, map and filter that works like their sync counterparts but are able to wait for async response.
* Any of the methods that have series in their name means that it will wait until it gets a response from one async function before it calls the next one.
* There is also a limit version on lots of these which enables you to limit the number of async functions running at any point in time. This is useful because you try and make a 1000 requests to the same database at once, it may not be able to handle all of these. By limiting the number of async functions being invoked at once, it means that we can reduce the amount of requests at any point in time.
* Finally, and this is Chris' favourite, there is a waterfall method. Have a look at the documentation but it is a useful method to have something be passed down from function to function to collate data from several different function calls.

9. Write a function called `fetchPizzas` that takes an array of pizza ids (use [1, 2, 3, 4]) and an error-first callback. In this function, use async.js with the array of ids to invoke `getPizzaById` for each id. Once you have got all pizza responses, invoke the callback with an array of the pizza objects.

10. Try re-writing tasks 6 & 7 using the async library. You can use your existing test suite as this should be a refactor and therefore all tests should still pass.

11. Write a function called `fetchLocalPizzaShopInfo` which takes an error-first callback as an argument. Use async.js to firstly invoke ```getLocalPizzaShops```. This function will return an array of pizzaShop objects. Loop through these and filter out the ones who do not deliver. For the remaining pizza shops, invoke ```getPizzasForShopId``` passing in each shop id. This will invoke its callback with an array of pizzas. You need to add these pizzas as a `pizzas` property to the relevant pizza shop object. Once all the pizza info has been received, invoke the error-first callback with the array of pizza shop objects. I would suggest looking at async waterfall for this task.
