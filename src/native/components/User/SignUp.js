import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Input, Item, Left, Right, Text, Title, View } from 'native-base';
import { ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Messages from '../UI/Messages';
import Spacer from '../UI/Spacer';
import Colors from '../../../../native-base-theme/variables/commonColor';

const welcomeScreenBg = require('../../../images/welcome.png');
const styles = {
  input_item: {
    backgroundColor: 'white',
    height: 32,
    paddingLeft: 10,
    marginTop: 10
  },
  input: {
    fontSize: 14
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
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover',
          marginTop: -20,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        source={welcomeScreenBg}
      >
        <Header transparent>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon style={{fontSize: 14}} name="ios-arrow-back"/>
              <Title style={{fontSize: 14}}> Back</Title>
            </Button>
          </Left>
          <Right/>
        </Header>

        <View style={{
          width: '85%',
          alignSelf: 'center',
          marginBottom: 20,
        }}>
          {error && <Messages message={error}/>}
          {success && <Messages type="success" message={success}/>}

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

          <Spacer size={20}/>

          <Button
            style={[styles.input_item, { backgroundColor: Colors.brandSuccessLight }]}
            rounded block onPress={this.handleSubmit} disabled={loading}>
            <Text uppercase={false}>{loading ? 'Loading' : 'Sign Up'}</Text>
          </Button>

          <Text
            style={{
              width: '100%',
              alignSelf: 'center',
              color: 'white',
              textAlign: 'center',
              lineHeight: 23,
              marginTop: 20,
            }}
          >
            By creating an account or logging in, you agree to our
            {' '}
            <Text
              style={{
                color: 'white',
                textDecorationLine: 'underline',
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
              }}
              onPress={() => alert('Policy')}
            >Privacy Policy</Text>
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

export default SignUp;
