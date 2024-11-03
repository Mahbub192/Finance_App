import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ExpensePercentage, ExpenseType } from "@/types";
import Colors from "@/constants/Colors";
import { Feather, FontAwesome6 } from "@expo/vector-icons";

const ExpenseBlock = ({
  expenseList,
  handleAddItem,
}: {
  expenseList: ExpensePercentage[];
  handleAddItem: Function;
}) => {
  const renderItem: ListRenderItem<Partial<ExpensePercentage>> = ({
    item,
    index,
  }) => {
    if (index == 0) {
      return (
        <TouchableOpacity onPress={() => handleAddItem()}>
          <View style={styles.addItemBtn}>
            <Feather name="plus" size={22} color={"#ccc"} />
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={[
          styles.expenseBlock,
          {
            backgroundColor: item?.color,
          },
        ]}
      >
        <Text
          style={[
            styles.expenseBlockTxt1,
            {
              color: Colors.black,
            },
          ]}
        >
          {item?.index}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <FontAwesome6
            name="bangladeshi-taka-sign"
            size={14}
            color={Colors.black}
          />
          <Text
            style={[
              styles.expenseBlockTxt2,
              {
                color: Colors.black,
                fontSize: 16,
                fontWeight: "800",
              },
            ]}
          >
            {item.amount}
          </Text>
        </View>
        <View style={styles.expenseBlock3View}>
          <Text
            style={[
              styles.expenseBlockTxt1,
              {
                color: Colors.black,
              },
            ]}
          >
            {item?.label}
          </Text>
        </View>
      </View>
    );
  };

  const staticItem = [{ name: "Add Item" }];
  return (
    <View style={{ paddingVertical: 20 }}>
      <FlatList
        data={staticItem.concat(expenseList)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ExpenseBlock;

const styles = StyleSheet.create({
  addItemBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#666",
    borderStyle: "dashed",
    borderRadius: 10,
    marginRight: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  expenseBlock: {
    backgroundColor: Colors.tintColor,
    width: 100,
    padding: 8,
    borderRadius: 15,
    marginRight: 20,
    gap: 2,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  expenseBlockTxt1: {
    color: Colors.white,
    fontSize: 14,
  },
  expenseBlockTxt2: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  expenseBlockTxt2Span: {
    fontSize: 12,
    fontWeight: "400",
  },
  expenseBlock3View: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: "100%",
    paddingVertical: 1,
    borderRadius: 3,
  },
});
