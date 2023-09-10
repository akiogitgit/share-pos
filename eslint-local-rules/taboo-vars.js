'use strict'
// pnpm eslint src\components\shares\CreateFolderButton.tsx --rulesdir rules

module.exports = {
  meta: {
    type: 'suggestion', // type (string) indicates the type of rule, which is one of "problem", "suggestion", or "layout":

    docs: {
      description: '引数の値の変数を禁止するルール',
    },
    schema: [
      {
        type: 'array', // 引数3のスキーマ
        items: {
          type: 'string', // 配列要素のスキーマ
        },
        uniqueItems: true,
      },
    ],
  },
  create: function (context) {
    console.log('context: ', context)
    console.log('options: ', context?.options[0])

    const tabooWords = context?.options[0] || ['']

    return {
      Identifier: node => {
        for (let i = 0; i < tabooWords.length; i++) {
          const tabooWord = tabooWords[i]

          if (node.name === tabooWord) {
            console.log(node.name, tabooWord)
            context.report({
              node,
              message: `${tabooWord}使ったらダメだよ！！`,
            })
          }
        }
      },
    }
  },
}
