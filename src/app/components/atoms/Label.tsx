import React, { PropsWithChildren } from 'react'

type Props = {
  htmlfor: string
}

const Label = ({ htmlfor, children }: PropsWithChildren<Props>) => {
  return (
    <label
      htmlFor={htmlfor}
      className="block text-sm font-medium text-gray-300 mb-2"
    >
      {children}
    </label>
  )
}

export default Label