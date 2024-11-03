export interface ExpenseType {
  id: string;
  name: string;
  amount: string;
  percentage: string;
}
export interface IncomeType {
  id: string;
  name: string;
  amount: string;
}
export interface SpendingType {
  id: string;
  name: string;
  amount: string;
  date: string;
}
export type Income = {
  id: number;
  type: string;
  date: string;
  amount: string;
  incomeType: string;
};

export type Entry = {
  id: number;
  type: string;
  date: string;
  amount: string;
  incomeType?: string;
};

export type ExpensePercentage = {
  value: number;
  color: string;
  label?: string;
  index: number;
  text: string;
  amount?: number;
};
