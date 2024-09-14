import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SessionList from '../components/SessionList';
import { useParams } from 'react-router-dom';

const ClassPage = () => {
  const { classId } = useParams();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get(`/api/classes/${classId}/sessions`)
      .then(response => {
        setSessions(response.data);
      })
      .catch(error => {
        console.log('Error fetching sessions', error);
      });
  }, [classId]);

  return (
    <div>
      <h2>Class Page</h2>
      <SessionList sessions={sessions} classId={classId} />
    </div>
  );
};

export default ClassPage;
