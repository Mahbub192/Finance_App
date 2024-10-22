import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SpendingType } from "@/types";
import Colors from "@/constants/Colors";

const SpendingBlock = ({ spendingList }: { spendingList: SpendingType[] }) => {
  return (
    <View style={{ marginVertical: 2, alignItems: "flex-start" }}>
      <Text style={{ color: Colors.white, fontSize: 16 }}>
        July <Text style={{ fontWeight: "700" }}>Spending</Text>
      </Text>
      {spendingList.map((item) => {
        return (
          <View
            style={{ flexDirection: "row", marginVertical: 10 }}
            key={item.id}
          >
            <View
              style={{
                backgroundColor: Colors.gray,
                padding: 15,
                borderRadius: 30,
                marginRight: 10,
              }}
            >
              <Text style={{ color: Colors.white }}>Icon</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ gap: 5 }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: Colors.white }}>{item.date}</Text>
              </View>
              <Text
                style={{ color: Colors.white, fontSize: 16, fontWeight: "600" }}
              >
                {item.amount}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default SpendingBlock;

const styles = StyleSheet.create({});
