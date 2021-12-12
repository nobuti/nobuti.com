---
title: Should we stop using redux in favor of Context API?
date: 2021-12-12
language: en
---

> This post is based on an internal lightning talk I did for my team at my current company

No.

That's all, end of the post. Thanks for reading me.

Jokes aside, beyond the clickbait I'll try to elaborate more why `redux` (or similar) should be your first choice whean dealing with the state management, even more when you are application is medium or large size. 

I do a lot of interviews to candidates at my current company, and it's shocking when one of them mentions that they usually manage the application state using Context API. We all know that React is fast and performant by default, but this is a dangerous way of thinking. I understand that Context API is so pleasant to work with, but it can hit your application's performace if you are not careful.

Why you may ask. Well, in the first place, Context is not a state management tool. Context can be used to inject dependencies, it's a transport mechanism. From the [Context documentation][]:

> Context provides a way to pass data through the component tree without having to pass props down manually at every level.

By default, Context API can't manage any state, any state management is done by using `useState` or `useReducer`. From that point of view, Context and Redux try to solve different things.

But the main reason is because of the performance. With `redux` you get the performance out-of-the-box. With Context, whenever the parent component re-renders and passes in a new reference to the context provider as the value, any component that consumes that context will be forced to re-render as well. There's a lot of posts out there that recommend setting up multiple separate contexts for different chunks of state, both to cut down on unnecessary re-renders and to scope concerns. Some solutions introduces the concept of [context selector components][], which require the use of `memo()`, `useMemo()`, and of course, splitting things up so there's [two separate contexts][] to manage the data and the updater functions separately. Sure, it's possible to write code that way, but at that point you're just trying to reinvent `redux`. Why not use the right tool for the job?

I made a little demo to explore these issues, checkout the console output of the different branches in order to see when re-renders happen: https://github.com/nobuti/react-redux-context

Some of you argue that redux introduces a lot of boilerplate, but what are your thoughts about this?

![pyramid of hell](https://user-images.githubusercontent.com/1366843/145710493-b7949ac4-93df-455d-b9fd-f7a0e5ac396d.png)

The boilerplate problem [has been solved][] long ago. Even you can adopt the same pattern to apply a more functional custom approach, like I did in the reference repo.

So please, let's stop demonizing `redux`. Using `redux` these days is actually very pleasant and you gain a lot by using it, especially in an enterprise environment.


[Context documentation]: https://reactjs.org/docs/context.html
[context selector components]: https://saul-mirone.github.io/performance-optimization-in-react-context/
[two separate contexts]: https://kentcdodds.com/blog/how-to-use-react-context-effectively
[has been solved]: https://redux-toolkit.js.org/