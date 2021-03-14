const conventionalCommit = require("./conventionalCommit.json");

const typesEnum = Object.keys(conventionalCommit.types);
const scopesEnum = Object.keys(conventionalCommit.scopes);

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", typesEnum],
    "scope-case": [2, "always", ["camel-case"]],
    "scope-enum": [2, "always", scopesEnum],
    "subject-empty": [2, "never"],
    "subject-case": [0, "always", ["lower-case"]],
    "header-max-length": [0, "always", 72],
  },
};
