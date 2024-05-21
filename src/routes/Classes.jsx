import * as React from 'react';
import Dir from '../components/Dir';
import Map from '../components/Map'

const Classes = () => {
  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Class" comp={<Map ids={true} personNames={true} />}></Dir>
    </div>
  )
}

export default Classes