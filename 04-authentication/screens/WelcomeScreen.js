import {Alert, StyleSheet, Text, View} from 'react-native';
import {useContext, useEffect, useState} from "react";
import {getMessage} from "../util/http";
import {AuthContext} from "../store/auth-context";

function WelcomeScreen() {
  const [message, setMessage] = useState('')
  const authCtx = useContext(AuthContext)

  const fetchMessage = async () => {
    try {
      const resp = await getMessage(authCtx.token)
      setMessage(resp);
    }catch (e) {
      console.log(e);
      Alert.alert(
          'Fetching data failed',
          'Please try again later!'
      )
    }
  }

  useEffect(() => {
    fetchMessage()
  }, [authCtx.token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
