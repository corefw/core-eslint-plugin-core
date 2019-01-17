/**
 * @file Prevent use of arrow functions.
 * @author Kevin Sanders <kevin@c2cschools.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Prevent use of arrow functions.",
            category: "Stylistic Issues",
            recommended: true
        },
        fixable: null,
        schema: [
        ]
    },

	/**
	 * Create and return rule definition.
	 *
	 * @param {Object} context
	 * @returns {Object}
	 */
    create: function(context) {

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        const rule = {};

		/**
		 * Rule listener for ArrowFunctionExpression nodes.
		 *
		 * @param {ASTNode} node
		 * @constructor
		 */
		rule.ArrowFunctionExpression = function(node) {

			// report

			context.report({
				node: node,
				loc: {
					line: node.loc.start.line,
					column: node.loc.start.column
				},
				message: 'Arrow functions are not allowed.',
            });
        };

        return rule;
    }
};
