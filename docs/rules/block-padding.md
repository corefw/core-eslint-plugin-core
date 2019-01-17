# Block padding that follows the Core Framework style guide. (block-padding)

This rule is part of the Core Framework JavaScript style guide.


## Rule Details

This rule enforces padding at the beginning and end of blocks.
More specifically, padding is always required at the beginning of blocks and is also required at the end of blocks
that contain more than just closing braces and brackets. Padding is forbidden at the end of blocks that only
contain closing braces and brackets. 

Examples of **incorrect** code for this rule:

```js

function Foo( x ) {
    let y = 1;
    
    if( x + y > 5 ) {
        return true;
    }
    return false;
    
}

function Bar( x, y ) {
    let z;
    
    try {
        z = x / y;
    } catch ( err ) {
        z = 0;
        
    }
    
    return z;
}

```

Examples of **correct** code for this rule:

```js

function Foo( x ) {
    
    let y = 1;
    
    if( x + y > 5 ) {
        
        return true;
    }
    
    return false;
}

function Bar( x, y ) {
    
    let z;
    
    try {
        
        z = x / y;
        
    } catch ( err ) {
        
        z = 0;
    }
    
    return z;
}

```


### Options

There are no options for this rule.
