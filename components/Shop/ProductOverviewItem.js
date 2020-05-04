import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Color } from "../../constant/Color";
import uuid from "react-uuid";

const ProductOverviewItem = ({ title, image, price, onSelect, buttonList }) => {
  let Touchable = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21)
    Touchable = TouchableNativeFeedback;

  return (
    <View style={styles.container}>
      <Touchable onPress={onSelect} style={{ height: "100%" }} useForeground>
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {buttonList &&
              buttonList.map((button) => (
                <Button
                  key={uuid()}
                  title={button.title}
                  color={Color.primary}
                  onPress={button.onPress}
                />
              ))}
          </View>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
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
  },
  detailContainer: {
    alignItems: "center",
    height: "15%",
  },
  title: {
    padding: 5,
    fontFamily: "open-sans-bold",
  },
  imageContainer: {
    height: "65%",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  price: {
    color: "#999",
    fontFamily: "open-sans",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    padding: 15,
  },
});

export default ProductOverviewItem;
