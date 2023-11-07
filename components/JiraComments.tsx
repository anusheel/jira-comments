import React, { useState } from 'react';
import JiraClient from 'jira-client';

const jira = new JiraClient({
  protocol: 'https',
  host: 'your-domain.atlassian.net',
  username: 'your-email@example.com',
  password: 'your-api-token',
  apiVersion: '2',
  strictSSL: true
});

// Define the props interface
interface JiraCommentsProps {
  issueId: string;
}

// Define the comment interface
interface Comment {
  id: string;
  body: string;
  // Add other properties of the comment that you use
}

const JiraComments = ({ issueId }: JiraCommentsProps) => {
  // Update the comments state to use the Comment interface
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<null | string>(null);

  const fetchComments = async () => {
    try {
      const issue = await jira.findIssue(issueId);
      // Ensure that the comments are of the correct type
      setComments(issue.fields.comment.comments as Comment[]);
      setError(null);
    } catch (err) {
      setError('Failed to fetch comments');
      setComments([]);
    }
  };

  const addComment = async () => {
    // Logic to add a new comment
  };

  return (
    <div className="p-4 border rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Comments</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchComments}
        >
          Fetch Comments
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2">
              <p className="text-sm">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={addComment}
      >
        + Add Comment
      </button>
    </div>
  );
};

export default JiraComments;