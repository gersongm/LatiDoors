"use client";
import { TrendingUp } from "lucide-react";

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { dataGraphic } from "./Graphic.data";
export function Graphic() {
  const data = dataGraphic;
  return (
    <div className="mt-5">
      <p className="text-3xl mb-3">24.50</p>
      <div className="flex gap-x-5 mb-5">
        <div className="flex items-center gap-2 px-3 text-md bg-[#16C8C7] text-white rounded-xl w-fit">
          8.5%
          <TrendingUp strokeWidth={1.5} className="w-4 h-4" />
        </div>
        <p className="text-slate-500">+432 incrementado</p>
      </div>
      <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ingresos" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="costos" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          <Bar dataKey="gastos" fill="#F47353" activeBar={<Rectangle fill="red" stroke="orange" />} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}



