const React = require('react-native');
const { StyleSheet } = React;
import theme from "./../../themes/base-theme";


export default {
  clearBtn: {
    alignSelf: 'center',
    margin: 20
  },
  modeTitle: {
    color: theme.inverseTextColor
  },
  successItem: {
    backgroundColor: theme.brandSuccess
  },
  failureItem: {
    backgroundColor: theme.brandDanger
  },
  defaultItem: {
    backgroundColor: theme.textColor
  }
};
