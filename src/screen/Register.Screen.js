import React, {useRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Pressable, Dimensions, BackHandler} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Overlay} from 'react-native-elements';
import {register} from '../redux/action/authAction';
import FastImage from 'react-native-fast-image';
import t from 'tcomb-form-native';
import nextIcon from '../assets/img/next_bg.png';

const {Form} = t.form;

function mysubtype(type, getValidationErrorMessage, name) {
  const Subtype = t.refinement(
    type,
    (x) => {
      return !t.String.is(getValidationErrorMessage(x));
    },
    name
  );
  Subtype.getValidationErrorMessage = getValidationErrorMessage;
  return Subtype;
}

const emailType = mysubtype(t.String, (s) => {
  const regExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (!s) {
    return 'Required';
  }
  if (!regExp.test(s)) {
    return 'Invalid email address';
  }
});

const passwordType = mysubtype(t.String, (s) => {
  const regExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
  if (!s) {
    return 'Required';
  }
  if (!regExp.test(s)) {
    return 'Password must contain at least one letter, at least one number, and be longer than 8 charaters.';
  }
});

const stringRequired = mysubtype(t.String, (s) => {
  if (!s) {
    return 'Required';
  }
});

// here we are: define your domain model
const User = t.struct({
  first_name: stringRequired,
  last_name: stringRequired,
  phone_number: t.Number,
  email: emailType, // a required string
  password: passwordType, // an optional string
});

const {textbox, textboxView} = t.form.Form.stylesheet;
//custom stylesheet
const newStyle = {
  ...t.form.Form.stylesheet,
  textbox: {
    ...textbox,
    normal: {...textbox.normal, borderWidth: 0, marginBottom: 0},
    error: {...textbox.error, borderWidth: 0, marginBottom: 0},
  },
  textboxView: {
    ...textboxView,
    normal: {
      ...textboxView.normal,
      borderWidth: 0,
      borderRadius: 3,
      borderBottomWidth: 1,
      marginBottom: 5,
      borderColor: '#959593',
    },
    error: {
      ...textboxView.error,
      borderWidth: 0,
      borderRadius: 3,
      borderBottomWidth: 1,
      marginBottom: 5,
      borderColor: '#959593',
    },
  },
};

const options = {
  stylesheet: newStyle,
  auto: 'none', // do not generate automatic labels nor automatic placeholders
  fields: {
    first_name: {
      placeholder: 'First Name',
    },
    last_name: {
      placeholder: 'Last Name',
    },
    phone_number: {
      placeholder: 'Phone Number',
    },
    email: {
      placeholder: 'Email',
    },
    password: {
      placeholder: 'Password',
      password: true,
      secureTextEntry: true,
    },
  },
};

const RegisterScreen = ({navigation}) => {
  const formRef = useRef();
  const {isValid, msg} = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const isFocused = useIsFocused();

  if (isValid) {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'AllMenu',
        },
      ],
    });
  }

  const toggleOverlay = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
        <Text>{msg.register}</Text>
      </Overlay>
      <View
        style={{
          padding: 0.1 * Dimensions.get('window').width,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: Dimensions.get('window').height,
        }}>
        <Text style={{fontSize: 48, fontWeight: 'bold'}}>Create Account</Text>
        <Form type={User} ref={formRef} options={options} />
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 32, fontWeight: 'bold', paddingTop: 10}}>Sign Up</Text>
          <Pressable
            onPress={() => {
              const formValue = formRef.current.getValue();
              if (formValue) {
                dispatch(register(formValue));
              }
            }}>
            <FastImage
              style={{width: 64, height: 64}}
              source={nextIcon}
              {...{resizeMode: 'cover'}}
            />
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text
            style={{
              fontSize: 20,
              paddingTop: 10,
              textDecorationLine: 'underline',
              color: '#AB84C8',
            }}>
            Sign In
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default RegisterScreen;
