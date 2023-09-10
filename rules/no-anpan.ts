import { TSESLint } from '@typescript-eslint/experimental-utils'

const rule: TSESLint.RuleModule<'no-anpan', []> = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    messages: { 'no-anpan': '{{ message }}' },
    schema: [],
  },
  create: context => {
    return {
      Identifier(node) {
        if (node.name === 'anpan') {
          context.report({
            node,
            messageId: 'no-anpan',
            data: {
              message: 'あんぱんおいしい😋',
            },
          })
        }
      },
    }
  },
}

module.exports = rule
