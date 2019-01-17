/**
 * @file Prevents use of arrow functions.
 * @author Kevin Sanders <kevin@c2cschools.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-arrow-functions");

const RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 6,
		sourceType: "module"
	}
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-arrow-functions", rule, {

    valid: [

       "Promise.then(function ( x, y ) { return true; });"
    ],

    invalid: [
        {
            code: "Promise.then(( x, y ) => { return true; });",
            errors: 1
        }
    ]
});
