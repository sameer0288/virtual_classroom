import React, { useEffect, useState } from 'react';
import { getLecture } from '../api'; // Importing from api.js
import CommentSection from './CommentSection';

const Lecture = ({ classId, lectureId }) => {
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the lecture details
    getLecture(classId, lectureId)
      .then(response => {
        setLecture(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching lecture', error);
        setError('Failed to load lecture details.');
        setLoading(false); // Set loading to false even if there is an error
      });
  }, [classId, lectureId]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>; // Display an error message if there was an issue
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{lecture.title}</h2>
      <p>{lecture.content}</p>
      <CommentSection lectureId={lectureId} />
    </div>
  );
};

export default Lecture;
