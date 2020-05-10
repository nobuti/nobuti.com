---
title: Typescript notes
date: 2020-05-08
language: en
draft: true
---

This blog post is a collection of notes from my learning journey of Typescript.

# What is TypeScript?

TypeScript is built and maintained by Microsoft. Microsoft's tagline for TypeScript is _JavaScript that scales_ as it helps you write large JavaScript based programs.

TypeScript is a superset of JavaScript which means that any feature in JavaScript is available in TypeScript. TypeScript adds a powerful type system to JavaScript that enables code editors to provide code refactoring and navigation features along with type checking.

TypeScript doesn't directly execute in the browser, it needs to be converted to JavaScript first. TypeScript has a compiler that can do this after type checking the code. The Babel compiler can also convert TypeScript code to JavaScript as well.

# Basic types

## The problem with primitive types in JavaScript

JavaScript does have some basic primitive types: `string`, `number`, and `boolean` types, but there is no specific `date` or `array` type; instead, these are of type object. Other primitive types available in JavaScript are `bigint`, `null`, `undefined`, and `symbol`.

```
console.log(typeof "wadus");
console.log(typeof 30);
console.log(typeof true);
console.log(typeof new Date(1989, 10, 5));
console.log(typeof BigInt(452947234234));
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof Symbol("*"));
```

You may have noticed that the type of a null variable is object and not null as we would expect. This is a [bug in JavaScript](https://2ality.com/2013/10/typeof-null.html)!

For more information on the types in JavaScript, see this [MDN doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures).

JavaScript is loosely typed, you don’t have to specify types of variables. Another caracteristic of loosy typed languajes is that there is nothing to prevent a variable from changing its type.



