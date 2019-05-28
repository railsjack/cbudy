import React from 'react';
import { Button, Container, Text } from 'native-base';
import { Dimensions, Image, ImageBackground, Platform, StatusBar, View } from 'react-native';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Actions } from 'react-native-router-flux';
import Terms from '../components/UI/Terms';

const welcomeScreenBg = require('../../images/main-bg.png');
const logoImage = require('../../images/logo.png');

const deviceHeight = Dimensions.get('window').height;


const Welcome = () => (
  <Container>
    <StatusBar barStyle="light-content"/>
    <ImageBackground
      source={welcomeScreenBg}
      style={{
        flex: 1,
        width: null,
        height: null,
      }}>
      <Button
        transparent
        style={{
          position: 'absolute',
          right: 10,
          top: 0,
        }}
      >
        <Text uppercase={false} style={{
          color: Colors.brandSuccessDark,
        }}>Skip</Text>
      </Button>

      <Image
        style={{
          alignSelf: 'center',
          resizeMode: 'stretch',
          width: 200,
          height: 200 * 1.188,
          marginTop: 80,
        }}
        source={logoImage}/>

      <View
        style={{
          alignSelf: 'center',
          width: '80%',
        }}
      >
        <Text
          style={{
            width: '100%',
            height: 50,
            lineHeight: 50,
            textAlign: 'center',
            color: Colors.brandSuccessLight,
            fontSize: Colors.fontSizeH3,
            fontWeight: 'bold',
          }}
        >
          Welcome
        </Text>

        <Button
          style={{
            backgroundColor: Colors.brandSuccessLight,
            marginTop: 30,
            width: '100%',
            height: 35,
            borderRadius: 15,
          }}
          onPress={() => Actions.signUp()}
        >
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: Colors.fontSizeBase,
            }}
            uppercase={false}
          >
            Sign Up
          </Text>
        </Button>

        <Button transparent style={{
          marginTop: 10,
          width: '100%',
          height: 35,
          borderRadius: 15,
        }}>
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: Colors.fontSizeBase,
              color: 'white',
            }}
            uppercase={false}
            onPress={() => Actions.login()}
          >
            Log in
          </Text>
        </Button>

        <Terms style={{ marginTop: 15 }}/>
        <Text
          style={{
            marginTop: 20,
            width: '100%',
            color: Colors.lightTextColor,
            textAlign: 'center',
            lineHeight: 23,
            fontSize: Colors.fontSizeBase,
            textDecorationLine: 'underline',
            fontWeight: 'bold'
          }}
        >
          List Your Sales, Coupons and Company
        </Text>

      </View>
    </ImageBackground>
  </Container>
);

export default Welcome;
