import React from 'react'

function TextComponent({title, content}) {
  return (
    <>
    <h6 className='font-semibold'>{title}</h6>
    <p className="text-sm">{content}</p>
    </>
  )
}

export default TextComponent