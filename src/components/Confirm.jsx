import React from 'react'
import { iconConfirm } from './Images'

export default function Confirm() {
  return (
    <div className='container__right__confirm'>
      <img src={iconConfirm} alt="icon" />
      <h1>Thank you!</h1>
      <p>Thank you for cofirming your subscription! We hope you have fun using our platform. if you ever need support, please feel free to email us at support@loramgaming.com</p>
    </div>
  )
}
