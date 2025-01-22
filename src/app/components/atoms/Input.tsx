import React, { FC } from 'react'

type Props = {
  id: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<Props> = ({ value, id, type, placeholder, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={value}
      onChange={onChange}
    />
  )
}

export default Input