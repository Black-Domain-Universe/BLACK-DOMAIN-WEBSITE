import recommended from 'stylelint-config-recommended';

export default {
  extends: [recommended],
  rules: {
    'declaration-block-no-shorthand-property-overrides': true,
  },
};
