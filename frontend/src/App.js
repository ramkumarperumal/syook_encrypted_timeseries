import io from 'socket.io-client'
import {useState} from 'react'

import './App.css';

const socket = io.connect('http://localhost:5000')

function App() {
  const [validData, setValidData] = useState([]);
  const [dataStats, setDataStats] = useState({});

  socket.on('realtime data', (data) =>{

    
    setDataStats(data[data.length-1]);
    setValidData(data.slice(0,data.length-1));

  }
  )
  return (
    <div>
      <h1>encrypted-timeseries</h1>
      <p>total data count: {dataStats.totalData} | total valid count: {dataStats.validData} | total distorted count: {dataStats.distortedData}</p>
      <p>success rate for data transmission: {dataStats.validData/dataStats.totalData}</p>
      <table>
        <tr>
          <th>NAME</th>
          <th>ORIGIN</th>
          <th>DESTINATION</th>
          <th>TIMESTAMP</th>
        </tr>
        {validData.map((each,index) => (
          <tr key = {index}>
            <td>{each.name}</td>
            <td>{each.origin}</td>
            <td>{each.destination}</td>
            <td>{each.timestamp}</td>
          </tr>
        ))}
      </table>
      
    </div>
  );
}

export default App;
 