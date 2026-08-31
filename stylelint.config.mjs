/** BDU CSS correctness gate — no auto-fix. */
export default {
  extends: ['stylelint-config-recommended'],
  rules: {
    'declaration-block-no-duplicate-properties': [true, {
      ignore: ['consecutive-duplicates-with-different-values'],
    }],
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-property-value-no-unknown': true,
  },
  ignoreFiles: ['**/node_modules/**', '**/.next/**', '**/dist/**'],
}
