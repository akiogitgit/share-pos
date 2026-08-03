'use strict'

module.exports = {
  meta: {
    type: 'suggestion', // type (string) indicates the type of rule, which is one of "problem", "suggestion", or "layout":

    docs: {
      description: 'sample rule',
    },
    fixable: null, // fixable (string) is either "code" or "whitespace" if the --fix option on the command line automatically fixes problems reported by the rule
    schema: [], // no options
  },
  /** @param {RuleContext} context */
  create: function (context) {
    return {
      /** @param {Program} node */
      Program(node) {
        context.report(node, 'sampleルールのエラーだよん！！！')
      },
    }
  },
}
