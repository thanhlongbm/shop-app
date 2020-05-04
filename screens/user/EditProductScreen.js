import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { editProduct, addProduct } from "../../redux/action/action";

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const product = useSelector((state) =>
    state.product.userProducts.find((item) => item.id === id)
  );
  const [title, setTitle] = useState(product ? product.title : "");
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState(product ? product.imgUrl : "");
  const [descript, setDescript] = useState(product ? product.description : "");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (product) dispatch(editProduct(id, title, url, descript));
    else dispatch(addProduct(title, url, descript, price));
    navigation.goBack();
  }, [dispatch, product, title, url, descript, price]);
  useEffect(() => {
    navigation.setParams({ submit: onSubmit });
  }, [onSubmit]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.nativeEvent.text)}
          />
        </View>
        {product ? null : (
          <View style={styles.form}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price.toString()}
              keyboardType="numeric"
              onChange={(e) =>
                setPrice(
                  parseFloat(e.nativeEvent.text ? e.nativeEvent.text : 0)
                )
              }
            />
          </View>
        )}
        <View style={styles.form}>
          <Text style={styles.label}>Image url</Text>
          <TextInput
            style={styles.input}
            value={url}
            onChange={(e) => setUrl(e.nativeEvent.text)}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={descript}
            onChange={(e) => setDescript(e.nativeEvent.text)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

EditScreen.navigationOptions = ({ navigation }) => {
  const onSubmit = navigation.getParam("submit");
  return {
    headerTitle: navigation.getParam("id") ? "Edit Product" : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item iconName="md-checkmark" title="Save" onPress={onSubmit} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  form: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    borderColor: "#555",
    height: 30,
    borderBottomWidth: 1,
    marginTop: 5,
    fontSize: 15,
    color: "#666",
  },
  label: {
    fontFamily: "open-sans-bold",
  },
});

export default EditScreen;
