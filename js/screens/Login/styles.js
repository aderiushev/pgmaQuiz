
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  titleRow: {
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center'
  },
  subtitle: {
    textAlign: 'right'
  },
  logo: {
    height: 300,
    width: 180,
    alignSelf: 'center'
  },
  authText: {
    textAlign: 'center'
  },
  formRow: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
};
