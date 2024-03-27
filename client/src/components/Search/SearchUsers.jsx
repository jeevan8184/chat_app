
import React, { useState } from 'react'

const SearchUsers = () => {
  const [text, setText] = useState('');

  
  return (
    <div>
      <input 
        type='text' 
        placeholder='search Users'
        value={text}
        onChange={(e)=> setText(e.target.value)}
        className=' w-full px-4 py-1.5 border rounded-full border-gray-800'
       />
    </div>
  )
}

export default SearchUsers