module.exports = {
    "root": true,
    "extends": ["eslint:recommended","prettier","plugin:react/recommended"],
    "env": {
        "es6": true,
        "node": true,
        "jquery": true,
        "browser": true,
        "mocha": true
    },
    "globals": {
        "Promise": true
    },
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
        "jsx":true
    },
    "plugins": [
        "prettier",
        "react"
    ],
    "rules": {
        "max-len": ['error', {
            "code": 120,
            "ignoreComments": true
        }], // default 80
        "indent": ['error', 2, {
            "SwitchCase": 1
        }], // not set by default
        "quote-props": ["error", "as-needed"],
        "comma-dangle": ["error", "only-multiline"], // allow trailing comma on multiline https://github.com/airbnb/javascript#commas--dangling
        "curly": [2, "all"], // enfornce curly braces even in single line if-else
        "no-unused-vars": ["error", {
            "vars": "all",
            "args": "after-used",
            "ignoreRestSiblings": false,
            "argsIgnorePattern": "(next|model|^_)"
        }],
        "prettier/prettier": "error"
    }
}
