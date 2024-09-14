import React from 'react';
import Lecture from '../components/Lecture';
import { useParams } from 'react-router-dom';

const LecturePage = () => {
  const { classId, lectureId } = useParams();

  return (
    <div>
      <Lecture classId={classId} lectureId={lectureId} />
    </div>
  );
};

export default LecturePage;
