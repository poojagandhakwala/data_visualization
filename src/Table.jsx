import React from 'react'

const Table = ({data}) => {
  return (
    <div>
         <div class="mt-4 lg:mt-0 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full lg:w-56 text-gray-500 dark:text-gray-400">
          <thead class="text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>No.</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody className='text-md'>
          {data.map((item, index) =>
            <tr key={index} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
              <td>{index + 1}</td><td>{item.value}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table