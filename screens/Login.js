import { StyleSheet, Text, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { LemmyHttp } from 'lemmy-js-client';

export default function Login({navigation, route}) {
  const [instanceURI, setInstanceURI] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onLogin = async () => {

    try {
      route.params.client = new LemmyHttp(instanceURI, null);

      route.params.client.login({
        username_or_email: username,
        password: password
      })
      .then( async (response) => {
        let data = await response

        SecureStore.setItemAsync(`server_instanceURI`, instanceURI)
        SecureStore.setItemAsync(`user_username`, username)
        SecureStore.setItemAsync(`server_jwt`, data.jwt)

        navigation.replace('Front Page', {client: route.params.client})
      })
    }
    catch(err){
      console.log(`Login Error`, err)
    }
    
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TextInput style={styles.textInput} id='uri' placeholder="Instance URI" onChangeText={(text) => setInstanceURI(text)} value={instanceURI} />
        <TextInput style={styles.textInput} id='username' placeholder="Username or Email" onChangeText={(text) => setUsername(text)} value={username} />
        <TextInput style={styles.textInput} id='password' placeholder="Password" onChangeText={(text) => setPassword(text)} value={password} />
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
