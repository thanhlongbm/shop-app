import React, { useEffect } from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";
import { Color } from "../../constant/Color";
import { useDispatch } from "react-redux";
import { authenticate } from "../../redux/action/action";

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        navigation.navigate("Auth");
        return;
      }
      const { token, userId, expireTime } = JSON.parse(userData);
      expireDate = new Date(expireTime);
      if (expireDate < new Date() || !token || !userId) {
        navigation.navigate("Auth");
        return;
      }

      const timeout = expireDate.getTime() - new Date().getTime();
      await dispatch(authenticate(userId, token, timeout));
      navigation.navigate("Main");
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Color.primary} />
    </View>
  );
};

export default StartupScreen;
