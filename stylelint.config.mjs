/** @type {import("stylelint").Config} */
export default {
  "extends": ["stylelint-config-standard", "stylelint-config-rational-order"],
  "rules": {
    "selector-class-pattern": ["^[a-z0-9\\-]+(__[a-z0-9\\-]+)*$"]
  }
};
