import React, { PropsWithChildren } from 'react'


const AccountGuide = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-6 text-center text-sm text-gray-400">
      {children}
    </div>
  )
}

export default AccountGuide