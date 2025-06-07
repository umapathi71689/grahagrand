import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../Api';

const UpcomingPropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.getUpcomingProperties();
        
        // Ensure we're working with an array
        const propertiesData = Array.isArray(response.data) 
          ? response.data 
          : response.data?.results || response.data?.data || [];
        
        setProperties(propertiesData);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load properties');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this upcoming property?')) {
      try {
        await api.deleteUpcomingProperty(id);
        setProperties(properties.filter(property => property.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete property');
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!properties.length) return <div className="p-4">No upcoming properties found</div>;

  return (
    <div className="upcoming-properties-container">
      <div className="upcoming-properties-header">
        <h2 className="upcoming-properties-title">Upcoming Properties</h2>
        <Link 
          to="/admin/upcoming-properties/add" 
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600"
        >
          Add New Upcoming Property
        </Link>
      </div>

      <div className="upcoming-properties-table">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Area (sq ft)</th>
              <th className="py-3 px-4 text-left">Completion Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{property.location}</td>
                <td className="py-3 px-4">{property.area}</td>
                <td className="py-3 px-4">
                  {property.expected_completion 
                    ? new Date(property.expected_completion).toLocaleDateString() 
                    : 'N/A'}
                </td>
                <td className="py-3 px-4 space-x-2">
                  <Link 
                    to={`/admin/upcoming-properties/edit/${property.id}`}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(property.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingPropertyList;