import React from 'react'

/**
 * Button component
 * @param {string} variant - 'primary' | 'secondary' | 'ghost'
 * @param {string} size    - 'sm' | 'md' | 'lg'
 * @param {React.ReactNode} children
 * @param {string} className - extra classes
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) {
  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : ''
  return (
    <button
      className={`btn btn-${variant} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
