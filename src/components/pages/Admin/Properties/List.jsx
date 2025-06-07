import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../Api';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.properties.getAll();
        // Make sure the data is an array
        const propertiesData = Array.isArray(response.data) 
          ? response.data 
          : response.data.results || [];  // Handle paginated responses
        
        setProperties(propertiesData);
      } catch (err) {
        setError(err.message || 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await api.properties.delete(id);
        setProperties(properties.filter(property => property.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete property');
      }
    }
  };

  if (loading) return <div className="p-4">Loading properties...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!properties.length) return <div className="p-4">No properties found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Properties</h2>
        <Link 
          to="/admin/properties/add" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Property
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Bedrooms</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{property.title}</td>
                <td className="py-3 px-4">${property.price?.toLocaleString()}</td>
                <td className="py-3 px-4">{property.bedrooms}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    property.status === 'available' ? 'bg-green-100 text-green-800' :
                    property.status === 'sold' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {property.status}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <Link 
                    to={`/admin/properties/edit/${property.id}`}
                    className="text-blue-500 hover:text-blue-700 hover:underline"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(property.id)}
                    className="text-red-500 hover:text-red-700 hover:underline"
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

export default PropertyList;