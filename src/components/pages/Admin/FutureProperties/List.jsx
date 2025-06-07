import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../Api';

const FutureDevelopmentList = () => {
  const [developments, setDevelopments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevelopments = async () => {
      try {
        const response = await api.futureDevelopments.getAll();
        // Ensure we're working with an array
        const data = Array.isArray(response.data) ? response.data : [];
        setDevelopments(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load future developments');
        setLoading(false);
        setDevelopments([]); // Ensure developments is set to empty array on error
      }
    };
    fetchDevelopments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this future development?')) {
      try {
        await api.futureDevelopments.delete(id);
        setDevelopments(developments.filter(dev => dev.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete development');
      }
    }
  };

  if (loading) return <div className="loading-state">Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="future-dev-container">
      <div className="future-dev-header">
        <h1 className="future-dev-title">Future Developments</h1>
        <Link to="/admin/future-developments/add" className="btn btn-primary">
          Add New Development
        </Link>
      </div>

      <table className="future-dev-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>Completion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {developments.length > 0 ? (
            developments.map(dev => (
              <tr key={dev.id}>
                <td>{dev.title}</td>
                <td>{dev.location}</td>
                <td>{new Date(dev.expected_start).toLocaleDateString()}</td>
                <td>{new Date(dev.expected_completion).toLocaleDateString()}</td>
                <td>
                  <Link 
                    to={`/admin/future-developments/edit/${dev.id}`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(dev.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No developments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FutureDevelopmentList;