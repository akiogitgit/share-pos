"use strict";
exports.__esModule = true;
var rule = {
    defaultOptions: [],
    meta: {
        type: 'problem',
        messages: { 'no-anpan': '{{ message }}' },
        schema: []
    },
    create: function (context) {
        return {
            Identifier: function (node) {
                if (node.name === 'anpan') {
                    context.report({
                        node: node,
                        messageId: 'no-anpan',
                        data: {
                            message: 'あんぱんおいしい😋'
                        }
                    });
                }
            }
        };
    }
};
module.exports = rule;
