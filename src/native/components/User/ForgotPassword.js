import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Input, Item, Left, Right, Text, Title, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from '../UI/Messages';
import Colors from '../../../../native-base-theme/variables/commonColor';
import { Image, ImageBackground } from 'react-native';
import Terms from '../../components/UI/Terms';


const welcomeScreenBg = require('../../../images/main-bg.png');
const logoImage = require('../../../images/lock.png');


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
};

class ForgotPassword extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    success: null,
    error: null,
    member: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => this.setState({ [name]: val });

  handleSubmit = () => {
    const { onFormSubmit } = this.props;

    return onFormSubmit(this.state)
      .then(() => setTimeout(() => {
        Actions.pop();
        Actions.login();
      }, 1000))
      .catch(() => {
      });
  };

  render() {
    const { loading, error, success } = this.props;
    const { email } = this.state;

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
              height: 100 * 1.388888888888889,
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
              Having trouble with your password? {'\n'}
              We will help you reset it!
            </Text>
          </Item>


          <Item rounded={true} style={styles.input_item}>
            <Input
              style={styles.input}
              placeholder='Type your email'
              disabled={loading}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={v => this.handleChange('email', v)}
            />
          </Item>


          <Button
            style={[styles.input_item, { backgroundColor: Colors.brandSuccessLight }]}
            rounded block onPress={this.handleSubmit} disabled={loading}>
            <Text uppercase={false}>{loading ? 'Loading' : 'Reset Password'}</Text>
          </Button>

          <Item style={{
            borderBottomWidth: 0,
            height: 20,
            marginBottom: 150
          }}/>

        </View>
      </ImageBackground>
    );
  }
}

export default ForgotPassword;
