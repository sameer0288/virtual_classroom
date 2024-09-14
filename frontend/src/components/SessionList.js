import React from 'react';
import { Link } from 'react-router-dom';

const SessionList = ({ sessions, classId }) => {
  return (
    <div>
      <h2>Sessions</h2>
      <ul>
        {sessions.map(session => (
          <li key={session._id}>
            <Link to={`/class/${classId}/lecture/${session._id}`}>{session.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;
