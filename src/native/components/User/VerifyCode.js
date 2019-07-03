import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Item, Left, Right, Text, Title, View } from 'native-base';
import Messages from '../UI/Messages';
import { Actions } from 'react-native-router-flux';
import Colors from '../../../../native-base-theme/variables/commonColor';
import { Image, ImageBackground, TextInput } from 'react-native';

const welcomeScreenBg = require('../../../images/main-bg.png');
const logoImage = require('../../../images/verifyCode.png');


const styles = {
  input_item: {
    backgroundColor: 'white',
    height: 31,
    paddingLeft: 10,
    marginTop: 12,
  },
  input: {
    fontSize: 14,
  },
  input_num: {
    width: 35,
    height: 35,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 7,
    fontSize: 16,
  },
};


class VerifyCode extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    member: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  };

  nums = [];
  numValues = [];

  static defaultProps = {
    error: null,
    success: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      verifyCode: props.member.verifyCode || ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResend = this.handleResend.bind(this);
  }

  handleChange = (name, val) => this.setState({ [name]: val });

  handleSubmit = () => {
    const { onFormSubmit } = this.props;

    return onFormSubmit(this.state)
      .then(()=>{
        setTimeout(()=>{
          Actions.home();
        }, 1000);
      })
      .catch(() => {

      });
  };

  handleResend = () => {
    const { onResendCode } = this.props;

    return onResendCode(this.state)
      .then(()=>{

      })
      .catch(() => {

      });
  };

  render() {
    const { loading, error, success, codeVerified } = this.props;

    const {verifyCode} = this.state;


    return (
      <ImageBackground
        style={{
          height: '100%',
        }}
        source={welcomeScreenBg}
      >
        <Header
          style={{
            backgroundColor: 'transparent',
            elevation: 0,
            shadow: 0,
          }}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon style={{ fontSize: Colors.fontSizeH3 }} name="ios-arrow-back"/>
              <Title style={{ fontSize: Colors.fontSizeBase }} uppercase={false}> Back</Title>
            </Button>
          </Left>
          <Right/>
        </Header>

        <View style={{
          flex: 1,
          resizeMode: 'cover',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '80%',
          height: '100%',
          alignSelf: 'center',
        }}>
          <Image
            style={{
              alignSelf: 'center',
              resizeMode: 'stretch',
              width: 100,
              height: 100 * 1.169312169312169,
              marginTop: 100,
            }}
            source={logoImage}/>

          {error && <Messages style={{ height: 30 }} message={error}/>}
          {success && <Messages style={{ height: 30 }} type="success" message={success}/>}

          {(!error && !success) &&
          <Item style={{
            height: 30,
            borderBottomWidth: 0,
            backgroundColor: 'transparent',
          }}/>
          }

          <Item style={{
            borderBottomWidth: 0,
          }}>
            <Text style={{
              color: 'white',
              textAlign: 'center',
              width: '100%',
              fontSize: Colors.fontSizeBase,
              lineHeight: 22,
            }}>
              Please check your email and enter {'\n'}
              the verification code below.
              {codeVerified}
            </Text>
          </Item>


          <Item style={[
            {
              marginVertical: 20,
              flexDirect: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
              borderBottomWidth: 0,
            },
          ]}>
            {[...Array(6)
              .keys()].map(index => {
              return (
                <TextInput
                  ref={v => this.nums[index] = v}
                  key={'key_' + index}
                  style={[
                    styles.input_num,
                  ]}
                  maxLength={1}
                  disabled={loading}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={async v => {
                    if (v === '' && index > 0){
                      this.nums[index - 1].focus();
                    }
                    if (v !== '' && index < 5) {
                      this.nums[index + 1].focus();
                    }
                    this.numValues[index] = v;
                    await this.setState({verifyCode: this.numValues.join('')});
                  }}
                />
              );
            })}
          </Item>


          <Button
            style={[styles.input_item, { backgroundColor: Colors.brandSuccessLight }]}
            rounded block onPress={this.handleSubmit} disabled={loading}>
            <Text uppercase={false}>{loading ? 'Loading' : 'Continue'}</Text>
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
              onPress={this.handleResend}
            >
              I didn't get a code
            </Text>
          </Button>

          <Item style={{
            borderBottomWidth: 0,
            height: 20,
            marginBottom: 150,
          }}/>

        </View>
      </ImageBackground>
    );
  }
}

export default VerifyCode;
