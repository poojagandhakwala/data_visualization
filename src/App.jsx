import { useState } from 'react'
import './App.css'
import BarChart from './Charts/BarChart'
import AirQualityMap from './AirQualityMap'
import Menu from './Menu'
import Table from './Table'
import PieChart from './Charts/PieChart'
import LineChart from './Charts/LineChart'
import DonutChart from './Charts/DonutChart'

function App() {

  const data = [
    { label: 'A', value: 30 },
    { label: 'B', value: 70 },
    { label: 'C', value: 45 },
    { label: 'D', value: 90 },
    { label: 'E', value: 20 },
  ];
    const [chart, setChart] = useState("");

  return (
    <>
      <div className='flex w-full flex-col lg:flex-row'>
        <Menu setChart={setChart} />
        <div className=''>
        {chart === "Bar" ? <BarChart data={data} />
        : chart === "Pie" ? <PieChart data={data}/>
        : chart==="Line" ? <LineChart data={data}/>
        : chart==="Donut" ? <DonutChart data={data}/>
        : <></>
        }
        </div>
        <Table data={data} />

      </div>
      <AirQualityMap city={"Delhi"} />
    </>
  )
}

export default App
