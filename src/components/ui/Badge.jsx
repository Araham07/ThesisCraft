import React from 'react'

/**
 * Badge component (pill label)
 * @param {string} variant - 'brand' | 'green' | 'orange'
 * @param {React.ReactNode} children
 * @param {string} className
 */
export default function Badge({ variant = 'brand', children, className = '', ...props }) {
  return (
    <span className={`badge badge-${variant} ${className}`} {...props}>
      {children}
    </span>
  )
}
