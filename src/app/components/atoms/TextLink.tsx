import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

type Props = {
  href: string
}

const TextLink = ({ href, children }: PropsWithChildren<Props>) => {
  return (
    <Link href={href} className="text-blue-500 hover:underline ml-1">
      {children}
    </Link>
  )
}

export default TextLink