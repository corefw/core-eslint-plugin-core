/**
 * @file Block padding that follows the Core Framework style guide.
 * @author Kevin Sanders <kevin@c2cschools.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/block-padding");

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

ruleTester.run("block-padding", rule, {

    valid: [

		"\n" +
		"function foo() {\n" +
		"\n" +
		"}\n" +
		"\n",

		"\n" +
		"function foo() {\n" +
		"\n" +
		"    return true;\n" +
		"}",

		"\n" +
		"(function foo() {\n" +
		"\n" +
		"    return true;\n" +
		"\n" +
		"})();",

		"\n" +
		"Promise.try(function() {\n" +
		"\n" +
		"    return true;\n" +
		"\n" +
		"}).then(function () {\n" +
		"\n" +
		"    return false;\n" +
		"});",

		"\n" +
		"Promise.try(function() {\n" +
		"\n" +
		"    return true;\n" +
		"\n" +
		"}).then(function () {\n" +
		"\n" +
		"    return true;\n" +
		"\n" +
		"}).then(function () {\n" +
		"\n" +
		"    return false;\n" +
		"});\n" +
		"",

		"\n" +
		"try {\n" +
		"\n" +
		"    var x = 1;\n" +
		"\n" +
		"} catch (err) {\n" +
		"\n" +
		"    console.log(err);\n" +
		"\n" +
		"} finally {\n" +
		"\n" +
		"    var x = 2;\n" +
		"}\n" +
		"\n",

		"\n" +
		"try {\n" +
		"\n" +
		"    var x = 1;\n" +
		"\n" +
		"} catch (err) {\n" +
		"\n" +
		"    console.log(err);\n" +
		"}\n" +
		"\n",

		"\n" +
		"class foo {\n" +
		"\n" +
		"}\n",

		"\n" +
		"function foo() {\n" +
		"\n" +
		"    // Do Nothing\n" +
		"}\n" +
		"\n",

		"\n" +
		"function foo() {\n" +
		"\n" +
		"}\n" +
		"\n",

		"\n" +
		"defaultMethods = {\n" +
		"    _parseOptions: function parseOptionsPlaceholder() {\n" +
		"        \n" +
		"        // Do Nothing\n" +
		"    },\n" +
		"};\n" +
		"\n",

		"class foo {\n" +
		"\n" +
		"    _normalizeInitialContextData() {\n" +
		"\n" +
		"        // Do Nothing\n" +
		"    }\n" +
		"}",

		"\n" +
		"switch (x) {\n" +
		" \n" +
		"  case \"1\":\n" +
		"    y = 2;\n" +
		"    break;\n" +
		"}\n" +
		"",

		"\n" +
		"function foo() {\n" +
		"\n" +
		"    return BB.resolve().then( function () {\n" +
		"\n" +
		"        if ( me._shared.outputToSqs ) {\n" +
		"\n" +
		"            return me._outputToSqs( data );\n" +
		"        }\n" +
		"\n" +
		"        return BB.resolve();\n" +
		"\n" +
		"    } ).then( function () {\n" +
		"\n" +
		"        if ( me._shared.allowViewerPushing ) {\n" +
		"\n" +
		"            return me._outputToViewer( data );\n" +
		"        }\n" +
		"\n" +
		"        return BB.resolve();\n" +
		"\n" +
		"    } ).then( function () {\n" +
		"\n" +
		"        return callback ? callback() : false;\n" +
		"\n" +
		"    } ).catch( function () {\n" +
		"\n" +
		"        return callback ? callback() : false;\n" +
		"    } );\n" +
		"}\n" +
		"\n",

		"\n" +
		"if ( x ) {\n" +
		"\n" +
		"}",

		"\n" +
		"if ( x ) {\n" +
		"\n" +
		"    // Do Nothing\n" +
		"}",

		"\n" +
		"( function () {\n" +
		"\n" +
		"    return new Promise( function ( resolve ) {\n" +
		"\n" +
		"        let files\t= [];\n" +
		"\n" +
		"        scan(\n" +
		"            {\n" +
		"                root: path,\n" +
		"            }\n" +
		"        ).file(\n" +
		"            glob,\n" +
		"            function ( file ) {\n" +
		"\n" +
		"                files.push( file );\n" +
		"            }\n" +
		"        ).done(\n" +
		"            function () {\n" +
		"\n" +
		"                resolve( files );\n" +
		"            }\n" +
		"        );\n" +
		"    } );\n" +
		"\n" +
		"} )();"
    ],

	invalid: [
		{
			code: "\nif (x == 1) {\n\n    x = 2;\n\n}\n",
			errors: 1
		},
		{
			code: "\nif (x == 1) {\n\n    x = 2;\n} else {\n\n    x = 3;\n}\n",
			errors: 1
		},
		{
			code: "\nif (x == 1) {\n\n    x = 2;\n\n} else if (x == 3) {\n\n    x = 4;\n} else {\n\n    x = 5;\n\n}\n",
			errors: 2
		},
		{
			code: "\nfunction foo() {\n\n    return true;\n\n}",
			errors: 1
		},
		{
			code: "\n(function foo() {\n\n    return true;\n})();",
			errors: 1
		},
		{
			code:
				"\n" +
				"if ( x ) {\n" +
				"\n" +
				"    // Do Nothing\n" +
				"\n" +
				"}",
			errors: 1
		},
		{
			code:
				"\n" +
				"if ( x ) {\n" +
				"\n" +
				"\n" +
				"}",
			errors: 1
		}
	]

});
