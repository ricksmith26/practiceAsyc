# Understanding Async

JavaScript code can be asyncronous and we need to know how to deal with this. We have many tools that we can utilise and this sprint focuses on the bread and butter. Callbacks.

Callbacks are currently the most common way that programmes can work with results from asyncronous functions/code. To recap on today's lecture, a callback is a function that may be invoked at some point in the future.

For this sprint, we are going to focus on the core concepts of async code. Some of the async functions are made for you but as developers, it is our job to tie these functions together to get the results we are after.

## Objectives

1. Learn to think asyncronously and be able to work with async functions. 
2. Learn how to write effective async code and understand the mechanisms and terminology behind this.
3. Continue to use TDD to make sure we are writing quality code
4. Learn about async.js library

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

3. To better understand async code and how to test async code, your next task is to write tests for the functions in the util folder. Make sure you think about how Mocha knows that your tests are asyncronous. Also make sure you read each function and understand what is happening. These functions are simple and can be assumed will not need to handle edge cases. This should help you just concentrate on tests that test the core functionality of these functions.

4. Write a function called `fetchSuperHeroes`. It will need to take an error-first callback as its only argument. This function needs to invoke the `getSuperHeroes` function and once it has received a response, it will capitalise the superhero names and invoke the callback with an array of capitalised superheroes.

5. Write a function called `fetchOpponents` that takes a error-first callback function and uses the function you just wrote to get an array of capitalised superheroes. It then needs to invoke `getArchEnemy` with each capitalised superhero name. As you start receiving results from `getArchEnemy`, build up an array of objects with hero and villain properties. Once you have had all the responses from `getArchEnemy`, invoke your callback with this array of hero/villain objects. i.e.

```[{hero: 'BATMAN', villain: 'THE JOKER'}, {hero: 'CAPTAIN AMERICA', villain: 'RED SKULL'}, ...]```

Here we will need to compose several async calls to build up the result and when ready, call the final callback with the built up array. The call to ```getArchEnemy``` is async so think about how you will know when it is time to invoke your callback with the array.

## Stage 2

This section considers some of the issues that callbacks and asyncronous code may face.

6. Write a function called `fetchContentOfFiles` that takes an array of file names and an error-first callback. It will need to invoke `getFile(fileName, yourCallbackFunction)` for each file. The function will need to collect up all of the responses and once it has received the final response, it will need to invoke the callback to with the array of responses in order they were requested in (not the order they are returned in).

The main issue here is being able to keep track of what response goes in which index as responses may not come back in order. The file names are arbitrary, so you can use whatever you as file names. Try using 5+ items in your array for tests.

7. Write a function called `fetchFilesAndLog`. It needs to take an array of file names and an error-first callback. This function will need to invoke `getFile(fileName, yourCallbackFunction)` for each file. This function must log the results in order that they are requested in and as soon as possible. So for example if we have files 1, 2, 3, 4. If 1 comes back first it will log 1, then if 3 comes back it will wait for 2 and then log 2 and 3. Then log 4 when it gets its response. Once all responses have been received, it needs to invoke the callback with the string 'Complete!';

This is a useful in the wild as it can help get feedback to the user earlier and make loading seem faster. I.e. if you was waiting for a page to load and it logged each as they came in, it would feel faster than waiting until everything had been received and logged them all at once. To be able to test this you will need to use a sinon spy function to 'wrap' the console.log method.

8. Write a function called `fetchFileWithTimeout` that takes a filename and an error-first callback. This function will need to invoke `getFileNoRes(fileName, yourCallbackFunction)`. As this function is designed to never call your callback, you need to guard against this in the callback you pass to `getFileNoRes`. Use a timer to invoke the your callback function after a period (i.e. 3s) of time if it has not already been called. Think back to your Higher Order Functions sprint or Lowbar ;)

In reality, we may use external libraries etc that we may not be able to trust completely. We don't want our code to forever be in a state of waiting so we may need have some kind of timer within our code so that we can short circuit out if the callback doesn't get called within a certain timeframe.

9. Write a function called `fetchFileWithSingleCall` that takes a filename and an error-first callback. This function will need to invoke `getFileMany(fileName, yourCallbackFunction)`. As this function is designed to 'acidentally' call your callback multiple times, you need to guard against this as in some cases. You need to stop this callback from being called more than once. Again, think back to your Higher Order Functions sprint or Lowbar ;)

Imagine a function that once a credit-card details are validated, it calls the callback. This callback could be a take payment callback and if this creditCardValidation function calls the callback multiple times, it could charge a client several times accidentally. Sad times.

## Stage 3

This section looks at the [async.js](https://caolan.github.io/async/). It is a bit like underscore but it works for async methods which comes in handy to manage async behaviour. Now theres lots it can do but there are some methods that are pretty useful to know about from the start;

* There is an each, map and filter that works like their sync counterparts but are able to wait for async response.
* Any of the methods that have series in their name means that it will wait until it gets a response from one async function before it calls the next one.
* There is also a limit version on lots of these which enables you to limit the number of async functions running at any point in time. This is useful because you try and make a 1000 requests to the same database at once, it may not be able to handle all of these. By limiting the number of async functions being invoked at once, it means that we can reduce the amount of requests at any point in time.
* Finally, and this is Chris' favourite, there is a waterfall method. Have a look at the documentation but it is a useful method to have something be passed down from function to function to collate data from several different function calls.

10. Write a function called `fetchPizzas` that takes an array of pizza ids (use [1, 2, 3, 4, 5]) and an error-first callback. In this function, use async.js with the array of ids to invoke `getPizzaById` for each id. Once you have got all pizza responses, invoke the callback with an array of the pizza objects.

11. Try re-writing tasks 6 & 7 using the async library. You can use your existing test suite as this should be a refactor and therefore all tests should still pass.

12. Write a function called `fetchLocalPizzaShopInfo` which takes an error-first callback as an argument. Use async.js to firstly invoke ```getLocalPizzaShops```. This function will return an array of pizzaShop objects. Loop through these and filter out the ones who do not deliver. For the remaining pizza shops, invoke ```getPizzasForShopId``` passing in each shop id. This will invoke its callback with an array of pizzas. You need to add these pizzas as a `pizzas` property to the relevant pizza shop object. Once all the pizza info has been received, invoke the error-first callback with the array of pizza shop objects. I would suggest looking at async waterfall for this task.