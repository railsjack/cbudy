import React from 'react';
import { ActivityIndicator, ImageBackground } from 'react-native';
import Colors from '../../../../native-base-theme/variables/commonColor';

const backgroundImage = require('../../../images/main-bg.png');

const Loading = () => (
  <ImageBackground
    source={backgroundImage}
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
    <ActivityIndicator size="large" color={Colors.brandLight}/>
  </ImageBackground>
);


export default Loading;
