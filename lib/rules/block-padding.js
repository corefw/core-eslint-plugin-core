/**
 * @file Block padding that follows the Core Framework style guide.
 * @author Kevin Sanders <kevin@c2cschools.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Block padding that follows the Core Framework style guide.",
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
		 * Checks if the given parameter is a comment node.
		 *
		 * @param {ASTNode|Token} node An AST node or token.
		 * @returns {boolean} True if node is a comment.
		 */
		function isComment(node) {

			return node.type === "Line" || node.type === "Block";
		}

		/**
		 * Gets the open brace token from a given node.
		 *
		 * @param {ASTNode} node A BlockStatement or SwitchStatement node from which to get the open brace.
		 * @returns {Token} The token of the open brace.
		 */
		function getOpenBrace(node) {

			if (node.type === "SwitchStatement") {

				return sourceCode.getTokenBefore(node.cases[0]);
			}

			return sourceCode.getFirstToken(node);
		}

		/**
		 * Gets the close brace token from a given node.
		 *
		 * @param {ASTNode} node A BlockStatement or SwitchStatement node from which to get the close brace.
		 * @returns {Token} The token of the close brace.
		 */
		function getCloseBrace(node) {

			return sourceCode.getLastToken(node);
		}

		/**
		 * Returns the first block token on a separate line after the specified opening brace token.
		 *
		 * @param {Token} token The opening brace token to check.
		 * @returns {?Token} The first block token.
		 */
		function getFirstBlockToken(token) {

			let prev;
			let first = token;

			do {

				prev = first;

				first = sourceCode.getTokenAfter(
					first,
					{
						includeComments: true
					}
				);

			} while(
				first &&
				isComment(first) &&
				(first.loc.start.line === prev.loc.end.line)
			);

			return first;
		}

		/**
		 * Returns the last block token on a separate line before the specified closing brace token.
		 *
		 * @param {Token} token The closing brace token to check.
		 * @returns {?Token} The last block token.
		 */
		function getLastBlockToken(token) {

			let last = token;
			let next;

			do {

				next = last;

				last = sourceCode.getTokenBefore(
					last,
					{
						includeComments: true
					}
				);

			} while(
				last &&
				isComment(last) &&
				(last.loc.end.line === next.loc.start.line)
			);

			return last;
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

		/**
		 * Checks to see if the line the token is on only contains closing tokens.
		 * Closing tokens are defined as }, ], ), ;, and comma (,).
		 *
		 * @param {Token} token The closing token to check.
		 * @returns {boolean} True if the line only contains closing tokens.
		 */
		function hasClosingTokensOnly(token) {

			let next		= token;
			let closingOnly	= true;

			const closingTokens = [ "}", "]", ")", ";", "," ];

			do {

				next = sourceCode.getTokenAfter( next );

				if(
					next &&
					(next.loc.start.line === token.loc.start.line) &&
					!closingTokens.includes(next.value)
				) {

					closingOnly = false;
				}

			} while (
				next &&
				next.loc.start.line === token.loc.start.line
			);

			return closingOnly;
		}

		/**
		 * Checks the given BlockStatement node to be padded if the block is not empty.
		 *
		 * @param {ASTNode} node The AST node of a BlockStatement.
		 * @returns {void}
		 */
        function checkPadding(node) {

        	// resolve tokens

        	const openBrace		= getOpenBrace(node);
        	const closeBrace	= getCloseBrace(node);

        	if(!openBrace) {
        		return;
			}

			if(!closeBrace) {
        		return;
			}

        	const firstBlockToken	= getFirstBlockToken(openBrace);
        	const lastBlockToken	= getLastBlockToken(closeBrace);

        	if(!firstBlockToken) {
        		return;
			}

			if(!lastBlockToken) {
        		return;
			}

        	const tokenBeforeFirst = sourceCode.getTokenBefore(
        		firstBlockToken,
				{
        			includeComments: true
        		}
			);

        	const tokenAfterLast = sourceCode.getTokenAfter(
        		lastBlockToken,
				{
        			includeComments: true
        		}
			);

        	// determine padding

        	let blockHasTopPadding		= isSinglePaddingBetweenTokens(tokenBeforeFirst, firstBlockToken);
        	let blockHasBottomPadding	= isSinglePaddingBetweenTokens(lastBlockToken, tokenAfterLast);

        	// if block is empty, don't duplicate padding

			if(node.body && (node.body.length === 0)) {

				const innerComments = sourceCode.getTokens(node, {
					includeComments: true,
					filter: isComment
				});

				if(innerComments.length === 0) {

        			blockHasBottomPadding = false;
				}
			}

			// determine padding requirements

        	let requireTopPadding		= true;
        	let requireBottomPadding	= true;

			let closingOnly	= hasClosingTokensOnly(closeBrace);

			if(closingOnly) {
				requireBottomPadding = false;
			}

			// if(node.parent) {
			//
        		// switch(node.parent.type) {
			//
			// 		case "IfStatement":
			//
			// 			// If/Else statement and not currently in the Else...
			//
			// 			if(node.parent.alternate && (node.parent.alternate !== node)) {
			//
			// 				requireBottomPadding = true;
			// 			}
			//
			// 			break;
			//
			// 		case "FunctionExpression":
			//
			// 			// Function is a param in a call expression...
			//
			// 			if(node.parent.parent && (node.parent.parent.type === "CallExpression")) {
			//
			// 				if(node.parent.parent.parent) {
			//
			// 					if(node.parent.parent.parent.type !== "MemberExpression") {
			//
			// 						if(node.parent.parent.callee === node.parent) {
			//
			// 							requireBottomPadding = true;
			// 						}
			//
			// 					} else {
			//
			// 						requireBottomPadding = true;
			// 					}
			// 				}
			// 			}
			//
			// 			break;
			//
			// 		case "TryStatement":
			//
			// 			// Try or Try/Finally statement...
			//
			// 			requireBottomPadding = !(node.parent.finalizer && node.parent.finalizer === node);
			//
			// 			break;
			//
			// 		case "CatchClause":
			//
			// 			// Catch clause in a Try statement...
			//
			// 			if(node.parent.parent && (node.parent.parent.type === "TryStatement")) {
			//
			// 				// Try statement contains a Finally clause...
			//
			// 				if(node.parent.parent.finalizer) { //} && node.parent.parent.finalizer !== node) {
			//
			// 					requireBottomPadding = true;
			// 				}
			// 			}
			//
			// 			break;
			// 	}
			// }

			// report

        	if(requireTopPadding && !blockHasTopPadding) {

        		context.report({
					node,
					loc: {
						line: tokenBeforeFirst.loc.start.line,
						column: tokenBeforeFirst.loc.start.column
					},
					message: 'One newline required at beginning of block.',
					fix(fixer) {
						return fixer.insertTextAfter(tokenBeforeFirst, "\n");
					},
				});
			}

			if(requireBottomPadding && !blockHasBottomPadding) {

				context.report({
					node: node,
					loc: {
						line: tokenAfterLast.loc.start.line,
						column: tokenAfterLast.loc.start.column
					},
					message: 'One newline required at end of block.',
					fix(fixer) {
						return fixer.insertTextBefore(tokenAfterLast, "\n");
					},
				});
			}

			if(!requireTopPadding && blockHasTopPadding) {

				context.report({
					node: node,
					loc: {
						line: tokenBeforeFirst.loc.start.line,
						column: tokenBeforeFirst.loc.start.column
					},
					message: 'Newline(s) not allowed at beginning of block.',
					fix(fixer) {

						return fixer.replaceTextRange(
							[
								tokenBeforeFirst.range[1],
								firstBlockToken.range[0] - firstBlockToken.loc.start.column
							],
							"\n"
						);
					},
				});
			}

			if(!requireBottomPadding && blockHasBottomPadding) {

				context.report({
					node: node,
					loc: {
						line: tokenAfterLast.loc.start.line,
						column: tokenAfterLast.loc.start.column
					},
					message: 'Newline(s) not allowed at end of block.',
					fix(fixer) {

						return fixer.replaceTextRange(
							[
								lastBlockToken.range[1],
								tokenAfterLast.range[0] - tokenAfterLast.loc.start.column
							],
							"\n"
						);
					}
				});
			}
		}

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        const rule = {};

		rule.SwitchStatement = function(node) {

			if (node.cases.length === 0) {
				return;
			}

			checkPadding(node);
		};

        rule.BlockStatement = function(node) {

        	checkPadding(node);
		};

		rule.ClassBody = function(node) {

			checkPadding(node);
		};

        return rule;
    }
};
