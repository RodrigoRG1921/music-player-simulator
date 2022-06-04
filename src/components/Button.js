import React from 'react'
import { BsSearch } from 'react-icons/bs'
import './Button.css'

export const Button = ({ title, handleClick, icon}) => {
  return (
    <div className="button-bar" onClick={handleClick}>
       {icon}
        <span>{title}</span>
    </div>
  )
}
