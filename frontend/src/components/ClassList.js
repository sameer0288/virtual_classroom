import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClasses } from '../api'; // Adjust the path as needed
import '../ClassList.css'; // Import CSS for styling

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await getClasses();
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes', error);
        setErrorMessage('Failed to load classes. Please try again later.');
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="class-list-container">
      <header className="class-list-header">
        <h1>Class Management System</h1>
      </header>
      <main className="class-list-main">
        <h2>Available Classes</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {classes.length === 0 ? (
          <div className="no-classes">
            <p>No classes available at the moment.</p>
            <Link to="/create-class" className="create-class-button">Create a New Class</Link>
          </div>
        ) : (
          <ul className="class-list">
            {classes.map(classItem => (
              <li key={classItem._id} className="class-item">
                <Link to={`/class/${classItem._id}`} className="class-link">
                  {classItem.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default ClassList;
