import React from 'react'

const Filter = ({search, handleSearchChange}) => {
    return(
        <div>
            Filter by name: <input value={search} onChange={handleSearchChange} />
        </div>
    )
}

export default Filter