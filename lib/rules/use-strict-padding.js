/**
 * @file Require padding around "use strict" directives.
 * @author Kevin Sanders <kevin@c2cschools.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		docs: {
			description: "Require padding around \"use strict\" directives.",
			category: "Stylistic Issues",
			recommended: true
		},
		fixable: "whitespace",
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

		const sourceCode = context.getSourceCode();

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		/**
		 * Gets all of the Use Strict Directives in the Directive Prologue of a group of
		 * statements.
		 *
		 * @param {ASTNode[]} statements Statements in the program or function body.
		 * @returns {ASTNode[]} All of the Use Strict Directives.
		 */
		function getUseStrictDirectives(statements) {

			const directives = [];

			for (let i = 0; i < statements.length; i++) {

				const statement = statements[i];

				if (
					statement.type === "ExpressionStatement" &&
					statement.expression.type === "Literal" &&
					statement.expression.value === "use strict"
				) {

					directives[i] = statement;

				} else {

					break;
				}
			}

			return directives;
		}

		/**
		 * Checks if there is single padding between two tokens.
		 *
		 * @param {Token} first The first token.
		 * @param {Token} second The second token.
		 * @returns {boolean} True if there is one line between the tokens.
		 */
		function isSinglePaddingBetweenTokens(first,second) {

			return second.loc.start.line - first.loc.end.line === 2;
		}

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		const rule = {};

		/**
		 * Rule listener for Program nodes.
		 *
		 * @param {ASTNode} node
		 * @constructor
		 */
		rule.Program = function(node) {

			const useStrictDirectives = getUseStrictDirectives(node.body);

			useStrictDirectives.forEach(function(useStrictDirective){

				// first token before directive node

				const tokenBefore = sourceCode.getTokenBefore(
					useStrictDirective,
					{
						includeComments: true
					}
				);

				// first token after directive node

				const tokenAfter = sourceCode.getTokenAfter(
					useStrictDirective,
					{
						includeComments: true
					}
				);

				// first token after token before node

				let tokenAfterBefore = null;

				if(tokenBefore) {

					tokenAfterBefore = sourceCode.getTokenAfter(
						tokenBefore,
						{
							includeComments: true
						}
					);
				}

				// first token before token after node

				let tokenBeforeAfter = null;

				if(tokenAfter) {

					tokenBeforeAfter = sourceCode.getTokenBefore(
						tokenAfter,
						{
							includeComments: true
						}
					);
				}

				// check padding before directive node

				let hasPaddingBefore = false;

				if(tokenBefore && tokenAfterBefore) {

					hasPaddingBefore = isSinglePaddingBetweenTokens(tokenBefore,tokenAfterBefore);

				} else {

					hasPaddingBefore = true;
				}

				// check padding after directive node

				let hasPaddingAfter = false;

				if(tokenAfter && tokenBeforeAfter) {

					hasPaddingAfter = isSinglePaddingBetweenTokens(tokenBeforeAfter,tokenAfter);

				} else {

					hasPaddingAfter = true;
				}

				// report

				if(!hasPaddingBefore) {

					context.report({
						node,
						loc: {
							line: useStrictDirective.loc.start.line,
							column: useStrictDirective.loc.start.column
						},
						message: "Newline required before directive."
					});
				}

				if(!hasPaddingAfter) {

					context.report({
						node,
						loc: {
							line: useStrictDirective.loc.start.line,
							column: useStrictDirective.loc.start.column
						},
						message: "Newline required after directive."
					});
				}
			});
		};

		return rule;
	}
};
