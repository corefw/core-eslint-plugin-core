# Require padding around "use strict" directives. (use-strict-padding)

This rule is part of the Core Framework JavaScript style guide.

## Rule Details

This rule enforces newline padding before and after "use strict" directives in the global scope.

Examples of **incorrect** code for this rule:

```js

/**
* @file This file defines class Foo.
*/ 
"use strict";
class Foo {

}

```

Examples of **correct** code for this rule:

```js

/**
* @file This file defines class Foo.
*/

"use strict";

class Foo {

}

```


### Options

There are no options for this rule.
