import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Entry } from "@/types";
import WalletIcon from "@/assets/icons/wallet.svg";
import { Feather, FontAwesome6 } from "@expo/vector-icons";

const IncomeBlock = ({ incomeList }: { incomeList: Entry[] }) => {
  const renderItem: ListRenderItem<Entry> = ({ item }) => {
    let amount = item.amount.split(".");
    return (
      <View
        style={{
          backgroundColor: Colors.gray,
          padding: 20,
          borderRadius: 20,
          marginRight: 15,
          width: 150,
          gap: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderColor: "#666",
              borderWidth: 1,
              borderRadius: 50,
              padding: 5,
              alignSelf: "flex-start",
            }}
          >
            <WalletIcon width={22} height={22} color={Colors.white} />
          </View>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: Colors.white }}>{item?.incomeType}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <FontAwesome6
            name="bangladeshi-taka-sign"
            size={14}
            color={Colors.white}
          />
          <Text
            style={{ color: Colors.white, fontSize: 18, fontWeight: "800" }}
          >
            {amount && amount[0]}.{" "}
            <Text style={{ fontSize: 14, fontWeight: "400" }}>00</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={{ color: Colors.white, fontSize: 16 }}>
        My <Text style={{ fontWeight: "700" }}>Income</Text>
      </Text>
      <FlatList
        data={incomeList}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default IncomeBlock;

const styles = StyleSheet.create({});
