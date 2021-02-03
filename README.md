# React: Higher-Order Components
## Introduction
A Higher-Order Component (HOC) is an advanced technique in React for reusing component logic.

HOCs are not a part of the React API, per se. They are a pattern that emerges from React's compositional nature.

You can view the React team's full documentation on HOCs [here](https://reactjs.org/docs/higher-order-components.html).

The crux of it is that **a higher order component is a function that takes a component and returns a *new* component**.

What does this really mean, though?

Let's do a quick recap over some other terminology for a little background.

## Pure Functions
The types of functions we are used to writing, or, at least, have been encouraged to write thus far, are known as 'Pure functions'. These are functions that meet three criteria:
* All data used by the function is declared as an argument
* The function does not mutate the data it was given, nor any other data, for that matter
* Given the same input, the function will produce the same result

Let's use an example of a basic add function.

```
function goodAdd(x, y) {
    return x + y;
};
```

This function receives two arguments which it then adds together to return a total value.

All of the data we are using are passed as arguments; we aren't mutating any data outside of the function; and, given the same input, it will always return the same output, so: a pure function.

In contrast, let's write a function called badAdd that takes one parameter (x) and adds it to an external value (y).

```
let y = 2;

function badAdd(x) {
    return x + y
}
```

What issues might this cause?

**It's important to note that HOCs operate under the criteria that make up a pure function.**

## Higher-Order Functions
Much the same as HOCs return new components a Higher-Order Function (HOF) is one which returns a new function. In many cases, this will mean the HOF taking a function as an argument, although this is not always the case.

Taking our ***good*** add function, let's say we wanted to log any result to the console pior to returning a result.

In certain cases we may be unable to edit the original function (e.g. it is being used for an additional purpose), however we can use it to create a new one.

```
function addAndLog(x, y) {
    const results = add(x, y);
    console.log(`Result: ${result}`)
    return results;
}
```

This function is great. It allows us to do exactly what we want. The only problem is that it's a tad verbose if, for instance, we wanted to do the same thing with a subtract function or a multiplication function.

The simple answer is that we can use a HOF to do this.

```
function logAndReturn(callback) {
    return callback (...args) {
        const result = callback(...args);
        console.log(`Result: ${result}`);
        return result;
    }
};

<!-- we create the functions like this -->

const addAndLog = logAndReturn(add);
const subtractAndLog = logAndReturn(subtract);

<!-- and invoke like this -->

addAndLog(4, 4)     // expected output 8
subtractAndLog(5,4) // expected output 1

```

## Higher-Order Components
HOCs work in a similar way to HOFs. Within what we just did, we created new functions. In React, we create new components. So how do we do this?

Let's take an example of an extremely basic HOC. Spin up a new React application on your machine and `npm start` in your terminal.

Let's remove everything inside our `App.js` and replace it with the following code.

```
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Hello World</h1>   
            </div>
        )
    }
};

export default App;
```
If we look in our browser, we should see **Hello World** printed out.

Inside your `App.js`, underneath export default App, we're going to create an additional two components.

```
class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <h4>User</h4>
      </div>
    )
  }
};

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <p>Hello User</p>
        <p>Thanks for coming back</p>
      </div>
    )
  }
};
```

Okay, now for the cool part.

Each of these components relates to our user and, therefore, we can use a HOC to personalize our user's experience.

Let's start by updating state.

```
this.state = {
    user: 'Dan Abramov'
}
```

Okay, so now that Dan Abramov is using your React app, you feel like you've made it, but we still have one more step to do.

Let's write a function that takes each of these components and returns new and improved ones with some user data.
