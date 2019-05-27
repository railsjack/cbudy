import React from 'react';
import { Button, Container, Text } from 'native-base';
import { Dimensions, ImageBackground, Platform, StatusBar, View } from 'react-native';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Actions } from 'react-native-router-flux';

const welcomeScreenBg = require('../../images/welcome.png');

const deviceHeight = Dimensions.get('window').height;

const styles = {
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30,
  },
  logo: {
    position: 'absolute',
    left: Platform.OS === 'android' ? 40 : 50,
    top: Platform.OS === 'android' ? 35 : 60,
    width: 280,
    height: 100,
  },
  text: {
    color: '#D8D8D8',
    bottom: 6,
    marginTop: 5,
    textAlign: 'center',
    lineHeight: 35,
  },
};

const Welcome = () => (
  <Container>
    <StatusBar barStyle="light-content"/>
    <ImageBackground
      source={welcomeScreenBg} style={styles.imageContainer}>
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

      <View
        style={{
          position: 'absolute',
          top: 300,
          width: '100%',
          lineHeight: 50,
          textAlign: 'center',
          color: Colors.brandSuccessLight,
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        <Text
          style={{
            width: '100%',
            height: 50,
            lineHeight: 50,
            textAlign: 'center',
            color: Colors.brandSuccessLight,
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Welcome
        </Text>

        <Button
          style={{
            backgroundColor: Colors.brandSuccessLight,
            marginTop: 30,
            width: '85%',
            height: 35,
            borderRadius: 15,
            alignSelf: 'center',
          }}
          onPress={()=>Actions.signUp()}
        >
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: 16,
            }}
            uppercase={false}
          >
            Sign Up
          </Text>
        </Button>

        <Button transparent style={{
          marginTop: 10,
          width: '85%',
          height: 35,
          borderRadius: 15,
          alignSelf: 'center',
        }}>
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: 16,
              color: 'white',
            }}
            uppercase={false}
            onPress={()=>alert('Login')}
          >
            Log in
          </Text>
        </Button>
        <Text
          style={{
            width: '90%',
            alignSelf: 'center',
            color: 'white',
            textAlign: 'center',
            lineHeight: 23,
            marginTop: 30,
          }}
        >
          By creating an account or logging in, you agree to our
          {' '}
          <Text
            style={{
              color: 'white',
              textDecorationLine: 'underline',
            }}
            onPress={()=>alert('Terms')}
          >Terms</Text>
          {' '}
          and
          {' '}
          <Text
            style={{
              color: 'white',
              textDecorationLine: 'underline',
            }}
            onPress={()=>alert('Policy')}
          >Privacy Policy</Text>
        </Text>
        <Text
          style={{
            marginTop: 20,
            width: '90%',
            alignSelf: 'center',
            color: 'white',
            textAlign: 'center',
            lineHeight: 23,
          }}
        >
          List Your Sales, Coupons and Company
        </Text>
      </View>
    </ImageBackground>
  </Container>
);

export default Welcome;
