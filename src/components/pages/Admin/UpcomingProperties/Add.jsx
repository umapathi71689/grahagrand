import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api';


const AddUpcomingProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    area: '',
    description: '',
    expected_completion: '',
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First create the upcoming property
      const response = await api.createUpcomingProperty(formData);
      const propertyId = response.data.id;
      
      // Then upload images if any
      if (images.length > 0) {
        await api.uploadImages(propertyId, images);
      }
      
      navigate('/admin/upcoming-properties');
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Upcoming Property</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {typeof error === 'object' ? JSON.stringify(error) : error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-var(--gray) rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Area (sq ft)</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-2 border border-var(--gray) rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Expected Completion Date</label>
            <input
              type="date"
              name="expected_completion"
              value={formData.expected_completion}
              onChange={handleChange}
              className="w-full p-2 border border-var(--gray) rounded"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-var(--gray) rounded"
            rows="4"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border border-var(--gray) rounded"
            accept="image/*"
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/upcoming-properties')}
            className="px-4 py-2 border border-var(--gray) rounded hover:bg-var(--gray)"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-var(--accent) text-var(--darker) rounded hover:bg-yellow-600"
          >
            Save Upcoming Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUpcomingProperty;