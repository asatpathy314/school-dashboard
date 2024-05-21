import * as React from 'react';
import Dir from '../components/Dir';
import Map from '../components/Map'

const Classes = () => {

  const data = [
    { fullName: 'John Doe', id: '123456' },
    { fullName: 'Jane Smith', id: '234567' },
    { fullName: 'Michael Johnson', id: '345678' },
    { fullName: 'Emily Brown', id: '456789' },
    { fullName: 'William Taylor', id: '567890' },
  ];

  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Class" comp={<Map ids={true} personNames={true} data={data}/>}></Dir>
    </div>
  )
}

export default Classes