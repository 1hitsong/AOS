import { StyleSheet, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import {init} from '../store/client'

export default function Login({navigation, route}) {
  const [instanceURI, setInstanceURI] = useState(``);
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);

  useEffect(() => {
    async function isLoggedIn() {
      const instanceURI = await SecureStore.getItemAsync('server_instanceURI')
      if (!instanceURI) return

      const server = await init(instanceURI)
      if (!server) return
      if (!server.jwt) return

      navigation.replace('Front Page')
    }
    isLoggedIn();
  }, []);

  const onLogin = async () => {
    try {

      const server = await init(instanceURI)

      server.client.login({
        username_or_email: username,
        password: password
      })
      .then( async (response) => {
        let data = await response

        SecureStore.setItemAsync(`server_instanceURI`, instanceURI)
        SecureStore.setItemAsync(`user_username`, username)
        SecureStore.setItemAsync(`server_jwt`, data.jwt)

        navigation.replace('Front Page')
      })
    }
    catch(err){
      console.log(`Login Error`, err)
    }
    
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TextInput style={styles.textInput} id='uri' autoCapitalize="none" inputMode="url" placeholder="Instance URI" onChangeText={(text) => setInstanceURI(text)} value={instanceURI} />
        <TextInput style={styles.textInput} id='username' autoCapitalize="none" placeholder="Username or Email" onChangeText={(text) => setUsername(text)} value={username} />
        <TextInput style={styles.textInput} id='password' autoCapitalize="none" placeholder="Password" onChangeText={(text) => setPassword(text)} value={password} />
        <Button onPress={onLogin} title='Login' />
      </ScrollView>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },

  textInput: {
    borderWidth: 1,
    borderColor: `#cccccc`,
    padding: 5,
    borderRadius: 2,
    marginBottom: 10
  },
});
