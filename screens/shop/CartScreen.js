import React from "react";
import { StyleSheet, View, Button, Text, FlatList } from "react-native";
import { Color } from "../../constant/Color";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/Shop/CartItem";
import { removeFromCart, orderItems } from "../../redux/action/action";

const CartScreen = () => {
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const itemList = useSelector((state) => {
    let list = [];
    for (const key in state.cart.items)
      list.push({
        key: key,
        title: state.cart.items[key].title,
        price: state.cart.items[key].price,
        amount: state.cart.items[key].amount,
      });
    return list.sort((a, b) => (a.key < b.key ? 1 : -1));
  });

  const buttonProps =
    totalPrice >= 0.1
      ? {
          color: Color.secondary,
          onPress: () => {
            dispatch(orderItems({ items: itemList, totalPrice: totalPrice }));
          },
        }
      : {
          color: "#777",
          onPress: () => {},
        };

  return (
    <View style={styles.container}>
      <View style={styles.totalBox}>
        <View style={styles.textBox}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={{ ...styles.totalText, color: Color.primary }}>
            ${totalPrice < 0.01 ? 0 : totalPrice.toFixed(2)}
          </Text>
        </View>
        <Button title="ODER NOW" {...buttonProps} />
      </View>
      <FlatList
        data={itemList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <CartItem
            title={item.title}
            price={item.price}
            amount={item.amount}
            deletable
            onDelete={() => {
              dispatch(removeFromCart(item.key));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "white",
  },
  textBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});

export default CartScreen;
