import {
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import WalletIcon from "@/assets/icons/wallet.svg";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import { PieChart } from "react-native-gifted-charts";
import ExpenseBlock from "@/components/ExpenseBlock";
import ExpensList from "@/data/expenses.json";
import IncomeLIst from "@/data/income.json";
import SpendingList from "@/data/spending.json";
import IncomeBlock from "@/components/IncomeBlock";
import SpendingBlock from "@/components/SpendingBlock";
import { FontAwesome6 } from "@expo/vector-icons";

const Page = () => {
  const [selected, setSelected] = useState("Income");
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const scaleValue = useRef(new Animated.Value(1)).current;
  const translateValue = useRef(new Animated.Value(0)).current;
  const pieDate = [
    {
      value: 47,
      color: Colors.tintColor,
      focused: true,
      text: "47%",
    },
    {
      value: 40,
      color: Colors.blue,
      text: "40%",
    },
    {
      value: 16,
      color: Colors.white,
      text: "16%",
    },
    {
      value: 3,
      color: "#FFA5BA",
      gradientCenterColor: "#FFA5BA",
      text: "hello",
    },
  ];
  const incomeType = [
    {
      id: 1,
      type: " Salary/Wages",
    },
    {
      id: 2,
      type: " Benefits/Perks",
    },
    {
      id: 3,
      type: " Allowances",
    },
    {
      id: 4,
      type: " Bonuses",
    },
    {
      id: 5,
      type: "  Overtime Pay",
    },
    {
      id: 6,
      type: " Gratuity",
    },
    {
      id: 7,
      type: "  Provident Fund (PF)",
    },
    {
      id: 8,
      type: " Other Incentives",
    },
  ];
  const expenseType = [
    {
      id: 1,
      type: "House rent",
    },
    {
      id: 2,
      type: "Transportation ",
    },
    {
      id: 3,
      type: "Insurance",
    },
    {
      id: 4,
      type: "Personal ",
    },
    {
      id: 5,
      type: "Medical",
    },
    {
      id: 6,
      type: "Education",
    },
    {
      id: 7,
      type: "Food and Groceries",
    },
    {
      id: 8,
      type: "Other Incentives",
    },
  ];
  const filterType = selected === "Income" ? incomeType : expenseType;
  const handleAddItem = async () => {
    console.log(42, modalVisible);
    setModalVisible(true);
  };

  const handleOutsidePress = () => {
    setModalVisible(false);
  };
  const handleIncomeExpenseButton = (type: string) => {
    setSelected(type);

    // Animation: Slide effect based on selected button
    Animated.timing(translateValue, {
      toValue: type === "Income" ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Interpolation for slide animation
  const translateX = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust based on your button width
  });

  // Animation trigger
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.7, // Button will shrink slightly
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Button returns to original size
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Animated style
  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />
      <View style={[styles.container, { paddingTop: 60 }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 10 }}>
              <Text style={{ color: Colors.white, fontSize: 16 }}>
                My <Text style={{ fontWeight: 700 }}>Expenses</Text>
              </Text>
              <Text
                style={{ color: Colors.white, fontSize: 36, fontWeight: 700 }}
              >
                $1475.<Text style={{ fontSize: 22, fontWeight: 400 }}>00</Text>
              </Text>
            </View>
            <View style={{ paddingVertical: 20, alignItems: "center" }}>
              <PieChart
                data={pieDate}
                donut
                showGradient
                sectionAutoFocus
                focusOnPress
                radius={60}
                innerRadius={40}
                innerCircleColor={"#232B5D"}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 22,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        47%
                      </Text>
                      <Text style={{ fontSize: 14, color: "white" }}>
                        Excellent
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <ExpenseBlock expensList={ExpensList} handleAddItem={handleAddItem} />
          <IncomeBlock incomeList={IncomeLIst} />
          <SpendingBlock spendingList={SpendingList} />

          <Modal
            transparent
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
              <View style={styles.modalContainer}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <TouchableOpacity>
                      <View style={styles.btnContainer}>
                        <View style={styles.borderWrapper}>
                          {/* Animated View for slide effect */}
                          <Animated.View
                            style={[
                              styles.animatedHighlight,
                              {
                                transform: [{ translateX }],
                              },
                            ]}
                          />

                          <View style={styles.buttonWrapper}>
                            {/* Income Button */}
                            <TouchableOpacity
                              onPress={() =>
                                handleIncomeExpenseButton("Income")
                              }
                              style={[
                                styles.btn,
                                selected === "Income" && {
                                  backgroundColor: Colors.blue,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.btnText,
                                  selected === "Income" && {
                                    color: Colors.black,
                                  },
                                ]}
                              >
                                Income{" "}
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontWeight: "900",
                                    color: Colors.white,
                                  }}
                                >
                                  (Credit)
                                </Text>
                              </Text>
                            </TouchableOpacity>

                            {/* Expense Button */}
                            <TouchableOpacity
                              onPress={() =>
                                handleIncomeExpenseButton("Expense")
                              }
                              style={[
                                styles.btn,
                                selected === "Expense" && {
                                  backgroundColor: Colors.blue,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.btnText,
                                  selected === "Expense" && {
                                    color: Colors.black,
                                  },
                                ]}
                              >
                                Expense{" "}
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontWeight: "900",
                                    color: Colors.white,
                                  }}
                                >
                                  (Debit)
                                </Text>
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                      <View style={{ width: "90%" }}>
                        <TextInput
                          style={[styles.inputFieldAmount, { fontSize: 20 }]}
                          placeholder="Enter Amount"
                          keyboardType="numeric"
                          placeholderTextColor={Colors.blue}
                          value={amount ? amount.toString() : ""}
                          onChangeText={(text) => setAmount(text)}
                        />
                      </View>
                      <View style={{ width: "10%", marginTop: 22 }}>
                        <FontAwesome6
                          name="bangladeshi-taka-sign"
                          size={24}
                          color={Colors.white}
                        />
                      </View>
                    </View>
                    <View style={styles.incomeBtnContainer}>
                      {filterType?.map((item) => {
                        return (
                          <View key={item.id} style={{ width: "45%" }}>
                            <TouchableOpacity style={styles.incomeBtnType}>
                              <Text style={styles.incomeBtnText}>
                                {item.type}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View style={{ width: "10%" }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: "600",
                          }}
                        >
                          Or,
                        </Text>
                      </View>
                      <View style={{ width: "90%" }}>
                        <TextInput
                          style={[styles.inputFieldAmount, { fontSize: 16 }]}
                          placeholder="Type Income Type"
                          keyboardType="default"
                          placeholderTextColor={Colors.blue}
                          value={amount ? amount.toString() : ""}
                          onChangeText={(text) => setAmount(text)}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        marginHorizontal: 80,
                        marginTop: 28,
                        marginBottom: 8,
                      }}
                    >
                      <Animated.View
                        style={[styles.buttonContainer, animatedStyle]}
                      >
                        <TouchableOpacity
                          onPressIn={handlePressIn}
                          onPressOut={handlePressOut}
                          onPress={() => {
                            // Handle save action here
                            console.log("Save button pressed!");
                          }}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                      </Animated.View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  modalContent: {
    backgroundColor: Colors.black,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 30,
  },
  inputContainer: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  inputFieldAmount: {
    height: 40,
    borderColor: "white",
    borderWidth: 0,
    color: Colors.white,
    marginHorizontal: 5,
    borderBottomWidth: 2,
  },

  btn1: {
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  incomeBtn: {
    fontSize: 16,
    fontWeight: "900",
  },
  incomeBtnContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 8,
  },
  incomeBtnType: {
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 0.5,
    borderBottomWidth: 2,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderColor: Colors.white,
  },
  incomeBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: Colors.blue, // Replace with your preferred color
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },
  btnContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  borderWrapper: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.blue,
    borderRadius: 10,
    padding: 3,
    width: 280, // Adjust width to fit buttons properly
    position: "relative",
  },
  animatedHighlight: {
    position: "absolute",
    width: 100, // Width of each button, adjust if needed
    height: "100%",
    backgroundColor: "rgba(0, 0, 255, 0.2)", // Highlight color
    borderRadius: 8,
    zIndex: -1, // Keep below buttons
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  btnText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "800",
  },
});
