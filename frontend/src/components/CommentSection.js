import React, { useState, useEffect } from 'react';
import { getComments, postComment } from '../api'; // Importing from api.js

const CommentSection = ({ lectureId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState(''); // State for error messages

  useEffect(() => {
    // Fetch comments when lectureId changes
    getComments(lectureId)
      .then(response => {
        setComments(response.data);
        setError(''); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error fetching comments', error);
        setError('Failed to fetch comments.'); // Set error message
      });
  }, [lectureId]);

  const handleAddComment = () => {
    if (commentText.trim() === '') {
      setError('Comment cannot be empty.'); // Validation error
      return;
    }

    postComment(lectureId, { content: commentText })
      .then(response => {
        setComments([...comments, response.data]);
        setCommentText('');
        setError(''); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error adding comment', error);
        setError('Failed to add comment.'); // Set error message
      });
  };

  return (
    <div>
      <h3>Comments</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
      <textarea
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
        placeholder="Add a comment"
        rows="4"
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
      <button onClick={handleAddComment} style={{ marginTop: '8px' }}>
        Submit
      </button>
    </div>
  );
};

export default CommentSection;
