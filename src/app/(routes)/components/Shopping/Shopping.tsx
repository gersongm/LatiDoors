
"use client";

import { PieChart, Pie, ResponsiveContainer,Cell, Legend, Tooltip } from 'recharts';
import { CustomIcon } from '@/components/CustomIcon';
import { ShoppingCart } from 'lucide-react';
import { ShoppingData } from './Shopping.data';
import { ICustomizedLabelProps } from './Shopping.type';
import { currencyFormatter } from '@/funtions';




const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



export function Shopping() {
    const data=ShoppingData;
  return (
    <div className="mb-4 lg:mb-0 shadow-sm bg-background rounded-lg p-5 w-full md:w-96 hover:shadow-lg transition">
        <div className='flex gap-x-2 items mb-2'>
         <CustomIcon icon={ShoppingCart}/>
         <p className='text-xl mt-2'>Total de Compras</p>
        </div>
        <div className='w-full h-[300px] p-5  items-center ' >
        <ResponsiveContainer width="100%" height="100%">
        <PieChart >
          <Pie
            data={data}
            isAnimationActive={false}
            cx="50%"
            cy="50%"
            label
            fill="#8884d8"
            dataKey="value"
            innerRadius={60} 
            outerRadius={80} 
            paddingAngle={5}
            
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>
             {index}
              </Cell>
            ))}
          </Pie>
          <Legend/>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
        </div>
        
    </div>
  )
}

