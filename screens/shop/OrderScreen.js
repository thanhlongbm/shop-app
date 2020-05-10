import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/Shop/OrderItem";
import { fetchOrder } from "../../redux/action/action";
import { Color } from "../../constant/Color";

const OrderScreen = () => {
  const orderLists = useSelector((state) => state.order);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    setError(null);
    setisLoading(true);
    try {
      await dispatch(fetchOrder());
    } catch (err) {
      setError(err.message);
    }
    setisLoading(false);
  }, [dispatch, setError, setisLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 10 }}>An error occured</Text>
        <Button
          title="Try Again"
          color={Color.primary}
          onPress={() => fetchData()}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

  if (orderLists.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>There's no order. Please order some products</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={orderLists}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <OrderItem
            totalPrice={item.totalPrice}
            items={item.items}
            date={item.date}
          />
        )}
      />
    </View>
  );
};

export default OrderScreen;
