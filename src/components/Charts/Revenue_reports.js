import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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


export default function Revenue_reports() {
  const {t} =useTranslation()
  return (
    <div className="Chart-container">
    <div className="chart-div">
      <h4>{t('abandoned_checkouts')}</h4>
      <select className="date-select" name="dates" id="dates">
        <option value="monthly">{t('monthly')}</option>
        <option value="weekly">{t('weekly')}</option>
        <option value="day">{t('day')}</option>
      </select>
    <BarChart
      width={500}
      height={300}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#08D0C6" />

    </BarChart>
  </div>
  </div>
  )
}
