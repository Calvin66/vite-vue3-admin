// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ["simple-import-sort"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
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
    "prettier/prettier": ["warn", {"singleQuote": true}]
  }
}
