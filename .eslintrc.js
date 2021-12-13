/*
 * @Author: Calvin
 * @Date: 2021-12-03 11:46:24
 * @FilePath: \.eslintrc.js
 * @Description: 
 */
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  plugins: ["simple-import-sort"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-debugger':0,
    'no-undef': 0, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-unused-vars': [1, {
      'vars': 'all', // 检测所有变量，包括全局环境中的变量。
      'args': 'none' // 不检查参数。
    }], // 禁止出现未使用过的变量
    "vue/component-definition-name-casing": 0,
    "vue/no-export-in-script-setup":0,
    "vue/multi-word-component-names":0,
    "simple-import-sort/imports": 1, // imports文件排序
    "simple-import-sort/exports": 1,// exports文件排序
    "prettier/prettier": ["warn", {"singleQuote": true}],
    "vue/no-unused-components":1,
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    'vue/no-setup-props-destructure': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    //can config  to 2 if need more then required
    '@typescript-eslint/no-unused-vars': [1],
  }
}
