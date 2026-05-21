import React from 'react'

export const ItemCombo = ({ item, functionByType }) => {
  return (
    <div
      onClick={() => functionByType(item)}
      className='flex flex-row gap-1 p-2 hover:bg-bg-secondary rounded-xl cursor-pointer'
    >
      <span>{item.icon}</span>
      <span>{item.name}</span>

    </div>
  )
}
