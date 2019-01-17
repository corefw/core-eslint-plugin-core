/**
 * @file Requires padding around "use strict" directives.
 * @author Kevin Sanders <kevin@c2cschools.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/use-strict-padding");

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

ruleTester.run("use-strict-padding", rule, {

	valid: [

		"\n// comment before\n" +
		"\n" +
		"\"use strict\";\n" +
		"\n" +
		"// comment after" +
		"\n",

		"\n" +
		"\"use strict\";\n" +
		"\n"
	],

	invalid: [
		{
			code:
				"// comment before\n" +
				"\"use strict\";\n" +
				"// comment after",
			errors: 2
		}
	]
});
