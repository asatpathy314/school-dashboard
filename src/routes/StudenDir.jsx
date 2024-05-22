import * as React from 'react';
import Dir from '../components/Dir';
import Map from '../components/Map';

const StudentDir = () => {
  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Student" comp={<Map ids={true} personNames={true} />}></Dir>
    </div>
  )
}

export default StudentDir