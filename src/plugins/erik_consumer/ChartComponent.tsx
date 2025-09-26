import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Expense } from "../erik_provider/types";

function getMonthlyTotals({ data }: { data: Expense[] }): MonthlyTotal[] {
const monthlyTotals: Record<string, number> = {
  Jan: 0,
  Feb: 0,
  Mar: 0,
  Apr: 0,
  May: 0,
  Jun: 0,
  Jul: 0,
  Aug: 0,
  Sep: 0,
  Oct: 0,
  Nov: 0,
  Dec: 0
};
  data.forEach((exp) => {
    const { month, value } = exp;
    monthlyTotals[month] = monthlyTotals[month] + value;
  });
  return Object.entries(monthlyTotals).map(([month, value]) => ({
    month,
    value
  }));
}

export default function ChartComponent({ data }: { data: Expense[] }) {
  const monthlyTotals: MonthlyTotal[] = getMonthlyTotals({ data });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={monthlyTotals}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="value"
          name=" Monthly Sum"
          fill="#8884d8"
          activeBar={<Rectangle fill="blue" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
