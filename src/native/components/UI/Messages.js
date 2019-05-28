import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';

import Colors from '../../../../native-base-theme/variables/commonColor';

const Messages = ({ style, message, type }) => (
  <View style={[{
    backgroundColor: (type === 'error') ? Colors.brandDanger : (type === 'success') ? Colors.brandSuccess : Colors.brandInfo,
    paddingHorizontal: 5,
  }, style]}
  >
    <Text style={{ color: '#fff', textAlign: 'center', lineHeight: style ? style.height : null, }}>
      {message}
    </Text>
  </View>
);

Messages.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success', 'info']),
  style: PropTypes.any,
};

Messages.defaultProps = {
  message: 'An unexpected error came up',
  type: 'error',
  style: null,
};

export default Messages;
