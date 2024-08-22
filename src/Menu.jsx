import React from 'react'

const Menu = ({ setChart }) => {

    return (
        <div className='text-left w-full mr-0 lg:mr-4'>
            <li className='cursor-pointer' onClick={() => setChart("Bar")}>
                <span className='hover:text-blue-500'>Bar Chart</span>
            </li>
            <li className='cursor-pointer' onClick={() => setChart("Pie")}>
                <span className='hover:text-blue-500'>Pie Chart </span>
            </li>
            <li className='cursor-pointer' onClick={() => setChart("Line")}>
                <span className='hover:text-blue-500'>Line Chart </span>
            </li>
            <li className='cursor-pointer' onClick={() => setChart("Donut")}>
                <span className='hover:text-blue-500'>Donut Chart</span>
            </li>
        </div>
    )
}

export default Menu