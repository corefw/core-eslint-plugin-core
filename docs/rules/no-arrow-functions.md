# Prevent use of arrow functions. (no-arrow-functions)

This rule is part of the Core Framework JavaScript style guide.


## Rule Details

This rule prevents the use of arrow functions.

Examples of **incorrect** code for this rule:

```js

return new Promise( ( resolve, reject ) => {

} );

```

Examples of **correct** code for this rule:

```js

return new Promise( function ( resolve, reject ) {

} );

```


### Options

There are no options for this rule.
