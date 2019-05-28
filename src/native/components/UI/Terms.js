import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';
import Colors from '../../../../native-base-theme/variables/commonColor';

const Terms = ({ style, title, content }) => (
  <View {...style} >
    <Text
      style={{
        alignSelf: 'center',
        color: 'white',
        textAlign: 'center',
        lineHeight: 23,
        fontSize: Colors.fontSizeBase,
      }}
    >
      By creating an account or logging in, you agree to our
      {' '}
      <Text
        style={{
          color: 'white',
          textDecorationLine: 'underline',
          fontSize: Colors.fontSizeBase,
        }}
        onPress={() => alert('Terms')}
      >Terms</Text>
      {' '}
      and
      {' '}
      <Text
        style={{
          color: 'white',
          textDecorationLine: 'underline',
          fontSize: Colors.fontSizeBase,
        }}
        onPress={() => alert('Policy')}
      >Privacy Policy</Text>
    </Text>
  </View>
);

Terms.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  props: PropTypes.any,
};

Terms.defaultProps = {
  title: 'Uh oh',
  content: 'An unexpected error came up',
  props: null,
};

export default Terms;
