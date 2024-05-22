import * as React from 'react';
import Dir from '../components/Dir';

const TeacherDir = () => {
  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Teacher" comp={<div></div>}></Dir>
    </div>
  )
}

export default TeacherDir