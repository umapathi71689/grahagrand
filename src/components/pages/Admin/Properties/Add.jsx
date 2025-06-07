import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api';

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    location: '',
    description: '',
    status: 'available',
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
      // First create the property
      const response = await api.createProperty(formData);
      const propertyId = response.data.id;
      
      // Then upload images if any
      if (images.length > 0) {
        await api.uploadPropertyImages(propertyId, images);
      }
      
      navigate('/admin/properties');
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {typeof error === 'object' ? JSON.stringify(error) : error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-var(--gray) rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-var(--gray) rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full p-2 border border-var(--gray) rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
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
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-var(--gray) rounded"
            >
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
        
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
            onClick={() => navigate('/admin/properties')}
            className="px-4 py-2 border border-var(--gray) rounded hover:bg-var(--gray)"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-var(--accent) text-var(--darker) rounded hover:bg-yellow-600"
          >
            Save Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;