import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entry } from "@/types";
import Colors from "@/constants/Colors";

const SpendingBlock = ({ spendingList }: { spendingList: Entry[] }) => {
  return (
    <View style={{ marginVertical: 2, alignItems: "flex-start" }}>
      <Text style={{ color: Colors.white, fontSize: 16 }}>
        July <Text style={{ fontWeight: "800" }}>Spending</Text>
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
                    fontWeight: "900",
                  }}
                >
                  {item.incomeType}
                </Text>
                <Text style={{ color: Colors.white }}>{item.date}</Text>
              </View>
              <Text
                style={{ color: Colors.white, fontSize: 16, fontWeight: "900" }}
              >
                {item.amount}.{" "}
                <Text style={{ fontSize: 12, fontWeight: "400" }}>00</Text>
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
