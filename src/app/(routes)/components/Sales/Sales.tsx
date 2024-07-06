
"use client";

import { PieChart, Pie, ResponsiveContainer,Cell, Legend, Tooltip } from 'recharts';
import { CustomIcon } from '@/components/CustomIcon';
import { Percent } from 'lucide-react';
import { SalesData } from './Sales.data';
import { ICustomizedLabelProps } from './Sales.type';




const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel: React.FC<ICustomizedLabelProps> = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function Sales() {
    const data=SalesData;
  return (
    <div className="mb-4 lg:mb-0 shadow-sm bg-background rounded-lg p-5 w-full md:w-96 hover:shadow-lg transition">
        <div className='flex gap-x-2 items mb-2'>
         <CustomIcon icon={Percent}/>
         <p className='text-xl mt-2'>Total de Ventas</p>
        </div>
        <div className='w-full h-[300px] p-5 items-center ' >
       <ResponsiveContainer width="100%" height="100%">
        <PieChart >
          <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={renderCustomizedLabel}
              labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend/>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer> 
 {/*        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
         <Tooltip />
        </PieChart>
      </ResponsiveContainer> */}
        </div>
        
    </div>
  )
}

