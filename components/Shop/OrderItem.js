import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Color } from "../../constant/Color";
import CartItem from "./CartItem";

const OrderItem = ({ totalPrice, items, date }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.button}>
        <Button
          title={showDetails ? "Hide Details" : "Show Details"}
          color={Color.secondary}
          onPress={() => {
            setShowDetails(!showDetails);
          }}
        />
      </View>
      {showDetails && (
        <View style={styles.itemList}>
          {items.map((item) => (
            <CartItem
              key={item.key}
              amount={item.amount}
              title={item.title}
              price={item.price}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowRadius: 10,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 5,
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  textBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  price: {
    fontFamily: "open-sans-bold",
  },
  date: {
    fontFamily: "open-sans",
    color: "#777",
  },
  button: {
    width: "60%",
    marginVertical: 10,
  },
  itemList: {
    width: "100%",
  },
});

export default OrderItem;
