import { t } from "i18next";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import "../../styles/charts.scss";
import { useTranslation } from 'react-i18next';


const data = [
  {
    name: "Jun",
    uv: 80,
    pv: 150,
  },
  {
    name: "Jul",
    uv: 200,
    pv: 220,
  },
  {
    name: "Aug",
    uv: 300,
    pv: 350,
  },
  {
    name: "Sep",
    uv: 310,
    pv: 280,
  },
  {
    name: "Oct",
    uv: 390,
    pv: 360,
  },
  {
    name: "Nov",
    uv: 400,
    pv: 350,
  },
];

export default function Sale_chart() {
  const { t } = useTranslation()

  return (
    <>
      <div className="Chart-container">
        <div className="chart-div">
          <h4>{t('sales_report')}</h4>
          <select className="date-select" name="dates" id="dates">
            <option value="monthly">{t('monthly')}</option>
            <option value="weekly">{t('weekly')}</option>
            <option value="day">{t('day')}</option>
          </select>

          <LineChart width={900} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="#607DFF" />
            <Line type="monotone" dataKey="pv" stroke="#D279FF" />
          </LineChart>
        </div>
      </div>
    </>
  );
}
