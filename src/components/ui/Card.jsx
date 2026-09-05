import React from 'react'

/**
 * Card component
 * @param {string} variant - 'default' | 'glass'
 * @param {React.ReactNode} children
 * @param {string} className
 */
export default function Card({ variant = 'default', children, className = '', ...props }) {
  const base = variant === 'glass' ? 'card-glass' : 'card'
  return (
    <div className={`${base} ${className}`} {...props}>
      {children}
    </div>
  )
}
