import React from 'react'
import { CardSummaryProps } from './CardSummary.type'
import { CustomIcon } from '@/components/CustomIcon';

export const CardSummary = (props:CardSummaryProps) => {
const {
    title,
    icon,
    tooltipText,
    average,
    total,
    
} = props;
    return (
    <div className='shadow-sm bg-background rounded-lg p-5 py-3 hover:shadow-lg transition'>
        <div className='flex justify-between items-center'>
            <CustomIcon icon={icon}/>
            {title}
            <div className='flex items-center gap-2'>
                <div className='p-2 bg-gray-100 rounded-full'>
                   
                    </div>
                    </div>
                    </div>
    </div>
  )
}
