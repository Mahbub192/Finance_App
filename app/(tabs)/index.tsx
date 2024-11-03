import ExpenseBlock from "@/components/ExpenseBlock";
import Header from "@/components/Header";
import IncomeBlock from "@/components/IncomeBlock";
import SpendingBlock from "@/components/SpendingBlock";
import Colors from "@/constants/Colors";
import ExpensList from "@/data/expenses.json";
import SpendingList from "@/data/spending.json";
import { Entry, ExpensePercentage, Income } from "@/types";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Stack } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";

const Page = () => {
  const [selected, setSelected] = useState("Income");
  const [modalVisible, setModalVisible] = useState(false);
  const [addNewType, setAddNewType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateString, setDateString] = useState(formatDate(date));
  const scaleValue = useRef(new Animated.Value(1)).current;
  const translateValue = useRef(new Animated.Value(0)).current;
  const [myIncome, setMyIncome] = useState<Income[]>([]);
  const [incomeData, setIncomeData] = useState<Entry[]>([]);
  const [expenseData, setExpenseData] = useState<Entry[]>([]);
  const [expensePercentages, setExpensePercentages] = useState<
    ExpensePercentage[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [remainingPercentage, setRemainingPercentage] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const db = useSQLiteContext();

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
      type: "  Provident Fund",
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
      type: "Food",
    },
    {
      id: 8,
      type: "Other Incentives",
    },
  ];

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const colorMapping: { threshold: number; color: string }[] = [
    { threshold: 0, color: "green" }, // 0% and below
    { threshold: 1, color: "lightgreen" }, // 1%
    { threshold: 2, color: "limegreen" }, // 2%
    { threshold: 3, color: "yellowgreen" }, // 3%
    { threshold: 4, color: "yellow" }, // 4%
    { threshold: 5, color: "gold" }, // 5%
    { threshold: 6, color: "orange" }, // 6%
    { threshold: 7, color: "darkorange" }, // 7%
    { threshold: 8, color: "red" }, // 8%
    { threshold: 9, color: "firebrick" }, // 9%
    { threshold: 10, color: "crimson" }, // 10%
    { threshold: 11, color: "darkred" }, // 11%
    { threshold: 12, color: "brown" }, // 12%
    { threshold: 13, color: "saddlebrown" }, // 13%
    { threshold: 14, color: "chocolate" }, // 14%
    { threshold: 15, color: "peru" }, // 15%
    { threshold: 16, color: "orangeRed" }, // 16%
    { threshold: 17, color: "tomato" }, // 17%
    { threshold: 18, color: "salmon" }, // 18%
    { threshold: 19, color: "lightcoral" }, // 19%
    { threshold: 20, color: "darksalmon" }, // 20%
    { threshold: 21, color: "coral" }, // 21%
    { threshold: 22, color: "mediumvioletred" }, // 22%
    { threshold: 23, color: "mediumseagreen" }, // 23%
    { threshold: 24, color: "springgreen" }, // 24%
    { threshold: 25, color: "deepskyblue" }, // 25%
    { threshold: 26, color: "dodgerblue" }, // 26%
    { threshold: 27, color: "royalblue" }, // 27%
    { threshold: 28, color: "steelblue" }, // 28%
    { threshold: 29, color: "cornflowerblue" }, // 29%
    { threshold: 30, color: "slateblue" }, // 30%
    { threshold: 31, color: "blue" }, // 31%
    { threshold: 32, color: "darkblue" }, // 32%
    { threshold: 33, color: "indigo" }, // 33%
    { threshold: 34, color: "purple" }, // 34%
    { threshold: 35, color: "darkviolet" }, // 35%
    { threshold: 36, color: "violet" }, // 36%
    { threshold: 37, color: "plum" }, // 37%
    { threshold: 38, color: "orchid" }, // 38%
    { threshold: 39, color: "lightpink" }, // 39%
    { threshold: 40, color: "pink" }, // 40%
    { threshold: 41, color: "hotpink" }, // 41%
    { threshold: 50, color: "deeppink" }, // 42% and above
    { threshold: 100, color: "black" }, // 51% and above
  ];

  console.log(148, transactions);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    setDateString(formatDate(currentDate));
  };

  function formatDate(date: Date) {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
  }

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

  const getAllStoreRow = async () => {
    try {
      const allRows: Income[] = await db.getAllAsync("SELECT * FROM income");
      console.log(280, allRows);
      setMyIncome(allRows);
    } catch (error) {
      console.log("Error while loading all income", error);
    }
  };

  const addIncrementOrExpense = async (
    selected: any,
    dateString: any,
    amount: any,
    addNewType: any
  ) => {
    try {
      const statement = await db.prepareAsync(
        "INSERT INTO income (type, date, amount, incomeType) VALUES(?,?,?,?)"
      );
      await statement.executeAsync([selected, dateString, amount, addNewType]);
      await getAllStoreRow();
    } catch (error) {
      console.log("Error while adding new income :", error);
    }
  };
  const handleSubmit = () => {
    addIncrementOrExpense(selected, dateString, amount, addNewType);
    setModalVisible(false);
  };

  useEffect(() => {
    // Calculate total income
    const incomeTotal = myIncome
      .filter((entry) => entry.type === "Income")
      .reduce((sum, entry) => sum + parseFloat(entry.amount), 0);

    // Calculate total expense
    const expenseTotal = myIncome
      .filter((entry) => entry.type === "Expense")
      .reduce((sum, entry) => sum + parseFloat(entry.amount), 0);

    // Update state
    setTotalIncome(incomeTotal);
    setTotalExpense(expenseTotal);
  }, [myIncome]);

  useEffect(() => {
    // Filter data based on type
    const incomeEntries = myIncome.filter((entry) => entry.type === "Income");
    const expenseEntries = myIncome.filter((entry) => entry.type === "Expense");

    // Store in state
    setIncomeData(incomeEntries);
    setExpenseData(expenseEntries);
  }, [myIncome]);

  useEffect(() => {
    const totalIncome = myIncome
      .filter((entry) => entry.type === "Income")
      .reduce((sum, entry) => sum + parseFloat(entry.amount), 0);

    const totalExpense = myIncome
      .filter((entry) => entry.type === "Expense")
      .reduce((sum, entry) => sum + parseFloat(entry.amount), 0);

    const balance = totalIncome - totalExpense;
    setRemainingBalance(balance);
    const balancePercentage = (balance / totalIncome) * 100;
    setRemainingPercentage(parseFloat(balancePercentage.toFixed(2)));

    // Define the type for expenseMap
    const expenseMap: Record<string, number> = {};

    myIncome.forEach((entry) => {
      if (entry.type === "Expense") {
        const type = entry.incomeType.trim(); // Normalize the incomeType
        if (!expenseMap[type]) {
          expenseMap[type] = 0; // Initialize if it doesn't exist
        }
        expenseMap[type] += parseFloat(entry.amount); // Sum the amounts
      }
    });

    // Create expense data for PieChart
    const expenseData = Object.keys(expenseMap).map((type, index) => {
      const percentage = (expenseMap[type] / totalIncome) * 100;

      // Determine color based on percentage thresholds
      let color = "";
      for (let i = 0; i < colorMapping.length; i++) {
        if (percentage <= colorMapping[i].threshold) {
          color = colorMapping[i].color;
          break;
        }
      }

      return {
        value: parseFloat(percentage.toFixed(2)), // rounded to two decimal places
        color,
        index,
        amount: expenseMap[type], // Include the aggregated amount for the type
        text: `${percentage.toFixed(2)}%`,
        label: `${percentage.toFixed(2)}% - ${type}`, // Label includes the type
        incomeType: type, // Store incomeType for display
      };
    });

    setExpensePercentages(expenseData);
  }, [myIncome]);
  useEffect(() => {
    getAllStoreRow();
  }, []);

  const handlePress = (index: any) => {
    console.log(362, index);
    setSelectedIndex(index); // Update the selected index when a section is pressed
  };
  // console.log(364, expensePercentages);
  const centerLabelValue =
    selectedIndex !== null
      ? expensePercentages[selectedIndex]?.value !== undefined
        ? `${expensePercentages[selectedIndex].value}%`
        : `${remainingPercentage.toFixed(2)}%`
      : `${remainingPercentage.toFixed(2)}%`; // Default to remaining percentage

  const centerLabelText =
    selectedIndex !== null
      ? expensePercentages[selectedIndex]?.value !== undefined
        ? expensePercentages[selectedIndex]?.label?.split("-")[1].trim() // Get the income type for display
        : "Saving"
      : "Saving"; // Default message if no selection
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
              <View>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: "900",
                  }}
                >
                  Income
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <FontAwesome6
                    name="bangladeshi-taka-sign"
                    size={16}
                    color={Colors.white}
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: "900",
                    }}
                  >
                    {totalIncome}.
                    <Text style={{ fontSize: 16, fontWeight: 400 }}>00</Text>
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: "900",
                  }}
                >
                  Expense
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <FontAwesome6
                    name="bangladeshi-taka-sign"
                    size={16}
                    color={Colors.white}
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: "900",
                    }}
                  >
                    {totalExpense}.
                    <Text style={{ fontSize: 16, fontWeight: 400 }}>00</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ paddingVertical: 20, alignItems: "center" }}>
              <PieChart
                data={expensePercentages}
                donut
                showGradient
                onPress={({ index }: any) => handlePress(index)}
                sectionAutoFocus
                focusOnPress
                radius={65}
                innerRadius={35}
                innerCircleColor={"#232B5D"}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "white",
                        }}
                      >
                        {centerLabelValue}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {centerLabelText}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <ExpenseBlock
            expenseList={expensePercentages}
            handleAddItem={handleAddItem}
          />
          <IncomeBlock incomeList={incomeData} />
          <SpendingBlock spendingList={expenseData} />

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
                                    color:
                                      selected === "Income"
                                        ? Colors.black
                                        : Colors.white,
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
                                    color:
                                      selected === "Expense"
                                        ? Colors.black
                                        : Colors.white,
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
                    <View style={styles.timePickerContainer}>
                      <TextInput
                        value={dateString}
                        editable={false}
                        style={[styles.input, { flex: 0.4, fontSize: 14 }]}
                      />
                      <TouchableOpacity onPress={showDatePicker}>
                        <MaterialIcons
                          name="calendar-today"
                          size={24}
                          color={Colors.white}
                        />
                      </TouchableOpacity>

                      {showPicker && (
                        <View style={styles.pickerContainer}>
                          <DateTimePicker
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={onChange}
                            style={styles.datePicker}
                            themeVariant="light" // If supported by your version
                          />
                        </View>
                      )}
                    </View>
                    <View style={styles.inputContainer}>
                      <View style={{ width: "90%" }}>
                        <TextInput
                          style={[styles.inputFieldAmount, { fontSize: 17 }]}
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
                            <TouchableOpacity
                              style={styles.incomeBtnType}
                              onPress={() => setAddNewType(item.type)}
                            >
                              <Text style={styles.incomeBtnText}>
                                {item.type}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                    <View style={{}}>
                      <View style={{}}>
                        <Text
                          style={{
                            color: Colors.white,
                            marginTop: 10,
                            fontSize: 16,
                            fontWeight: "600",
                            textAlign: "center",
                          }}
                        >
                          Or,
                        </Text>
                      </View>
                      <View style={{}}>
                        <TextInput
                          style={[styles.inputFieldAmount, { fontSize: 14 }]}
                          placeholder={
                            selected === "Income"
                              ? "Enter Income Type"
                              : "Enter Expense Type"
                          }
                          keyboardType="default"
                          placeholderTextColor={Colors.blue}
                          value={addNewType ? addNewType.toString() : ""}
                          onChangeText={(text) => setAddNewType(text)}
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
                          onPress={() => handleSubmit()}
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
  timePickerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    paddingTop: 12,
    marginRight: 10,
    gap: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    marginBottom: 6,
    color: Colors.white,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  datePicker: {
    // Custom styles could be applied here but typically DateTimePicker has limited styling options
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
    fontSize: 14,
    fontWeight: "500",
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
