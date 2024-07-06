import React from 'react'
import { CustomIconProps } from './Custon.types'
export const CustomIcon = (props:CustomIconProps) => {
  const {icon:Icon} = props;
    return (
    <div className='p-2 bg-slate-400/20 rounded-lg'>
        <Icon strokeWidth={1} className='w-6 h-6'/>
        </div>
  )
}
