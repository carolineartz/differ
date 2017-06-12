import React from 'react';

export const Row = ({className="", ...props}) => (
  <div { ...props } className={`row ${className}`} />
)
export const Col = ({defs, className="", ...props}) => (
  <div { ...props } className={`${defs} ${className}`} />
)

