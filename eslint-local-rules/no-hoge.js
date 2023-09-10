// import { TSESLint } from '@typescript-eslint/experimental-utils'
'use strict'

// 一応型が効く
/**
 * @type {import("@typescript-eslint/experimental-utils").TSESLint.RuleModule}
 */
module.exports = {
  meta: {
    type: 'suggestion', // type (string) indicates the type of rule, which is one of "problem", "suggestion", or "layout":

    docs: {
      description: 'sample rule',
    },
  },
  create: function (context) {
    return {
      Identifier: node => {
        if (node.name === 'hoge') {
          context.report({
            node,
            message: 'hoge使ったらダメだよ！！',
          })
        }
      },
    }
  },
}

// module.exports = context => {
//   return {
//     Identifier: node => {
//       if (node.node === 'hoge') {
//         context.report({
//           node,
//           message: 'you must not use hoge variable.',
//         })
//       }
//     },
//   }
// }
