import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Input, Item, Left, Right, Text, Title, View } from 'native-base';
import { Image, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Messages from '../UI/Messages';
import Colors from '../../../../native-base-theme/variables/commonColor';
import Terms from '../../components/UI/Terms';

const welcomeScreenBg = require('../../../images/main-bg.png');
const logoImage = require('../../../images/logo.png');

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

class SignUp extends React.Component {
  static propTypes = {
    success: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: null,
    success: null,
  };

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => this.setState({ [name]: val });

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => setTimeout(() => {
        Actions.pop();
        Actions.login();
      }, 1000))
      .catch(() => {
      });
  };

  render() {
    const { loading, error, success } = this.props;

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
              width: 200,
              height: 200 * 1.188,
            }}
            source={logoImage}/>

          {error && <Messages style={{height: 30}} message={error}/>}
          {success && <Messages style={{height: 30}} type="success" message={success}/>}

          {(!error && !success) &&
          <Item style={{
            height: 30,
            borderBottomWidth: 0,
            backgroundColor: 'transparent',
          }}/>
          }


          <Item rounded={true} style={styles.input_item}>
            <Input
              style={styles.input}
              placeholder='Display Name'
              disabled={loading}
              onChangeText={v => this.handleChange('firstName', v)}
            />
          </Item>

          <Item rounded={true} style={styles.input_item}>
            <Input
              style={styles.input}
              placeholder='Email'
              disabled={loading}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={v => this.handleChange('email', v)}
            />
          </Item>

          <Item rounded={true} style={styles.input_item}>
            <Input
              style={styles.input}
              placeholder='Password'
              disabled={loading}
              secureTextEntry
              onChangeText={v => this.handleChange('password', v)}
            />
          </Item>

          <Item rounded={true} style={styles.input_item}>
            <Input
              style={styles.input}
              placeholder='Confirm Password'
              disabled={loading}
              secureTextEntry
              onChangeText={v => this.handleChange('password2', v)}
            />
          </Item>

          <Item style={{
            borderBottomWidth: 0,
            height: 10,
          }}/>

          <Button
            style={[styles.input_item, { backgroundColor: Colors.brandSuccessLight }]}
            rounded block onPress={this.handleSubmit} disabled={loading}>
            <Text uppercase={false}>{loading ? 'Loading' : 'Sign Up'}</Text>
          </Button>

          <Item style={{
            borderBottomWidth: 0,
            height: 10,
          }}/>

          <Terms style={{ marginBottom: 40 }}/>
        </View>
      </ImageBackground>
    );
  }
}

export default SignUp;
