import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Color } from "../../constant/Color";
import { useDispatch } from "react-redux";
import { login, signup } from "../../redux/action/action";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const checkValidEmail = (email) => {
    if (!email) return false;
    return email.match(/^\w+@\w+\.\w+$/) != null;
  };
  const checkValidPass = (pass) => {
    if (!pass) return false;
    return pass.length >= 8;
  };

  const authSubmit = useCallback(
    async (type) => {
      if (!checkValidPass(password) || !checkValidEmail(username)) return;
      setError(null);
      setIsLoading(true);
      try {
        if (type == "login") {
          await dispatch(login(username, password));
          navigation.navigate("Main");
        } else if (type == "signup") {
          await dispatch(signup(username, password));
          Alert.alert("Complete", "Signup successfully", [{ text: "OK" }]);
          setIsLoading(false);
          setPassword("");
          setUsername("");
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    },
    [dispatch, username, password, setIsLoading, setError]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred", error, [{ text: "OK" }]);
    }
  }, [error]);

  return (
    <View style={{ justifyContent: "center", flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.nativeEvent.text)}
          />
          {!checkValidEmail(username) ? (
            <Text style={styles.errorText}>Invalid email</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          {!checkValidPass(password) ? (
            <Text style={styles.errorText}>Invalid password</Text>
          ) : null}
        </View>
        {isLoading ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color={Color.primary} />
          </View>
        ) : (
          <View>
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                color={Color.primary}
                onPress={() => authSubmit("login")}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Sign Up"
                color={Color.secondary}
                onPress={() => authSubmit("signup")}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    overflow: "hidden",
    shadowRadius: 10,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: "white",
    paddingVertical: 10,
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    marginTop: 5,
    fontSize: 15,
    color: "#777",
  },
  label: {
    fontFamily: "open-sans-bold",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontFamily: "open-sans",
  },
});

export default LoginScreen;
