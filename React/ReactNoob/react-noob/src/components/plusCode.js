import React from 'react'
import { encode } from 'pluscodes';
export default function PlusCode() {
    const plusCode = encode({ lat: 51.4837, lng: -3.1681 })
  return (
    <div>{plusCode}</div>
  )
}
