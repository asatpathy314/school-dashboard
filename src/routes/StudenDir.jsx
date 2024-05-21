import * as React from 'react';
import Dir from '../components/Dir';

const StudentDir = () => {
  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Student" comp={<div></div>}></Dir>
    </div>
  )
}

export default StudentDir