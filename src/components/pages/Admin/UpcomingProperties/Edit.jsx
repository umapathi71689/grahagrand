import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../Api';


const EditUpcomingProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    area: '',
    description: '',
    expected_completion: '',
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.getUpcomingProperty(id);
        setFormData({
          location: response.data.location,
          area: response.data.area,
          description: response.data.description,
          expected_completion: response.data.expected_completion.split('T')[0],
        });
        setExistingImages(response.data.images || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await api.deleteImage(id, { image_id: imageId });
      setExistingImages(existingImages.filter(img => img.id !== imageId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the upcoming property
      await api.updateUpcomingProperty(id, formData);
      
      // Upload new images if any
      if (images.length > 0) {
        await api.uploadImages(id, images);
      }
      
      navigate('/admin/upcoming-properties');
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Upcoming Property</h2>
      
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
          <label className="block mb-1">Existing Images</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {existingImages.map(image => (
              <div key={image.id} className="relative">
                <img 
                  src={image.image} 
                  alt="Upcoming Property" 
                  className="w-32 h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image.id)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          
          <label className="block mb-1">Add New Images</label>
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
            Update Upcoming Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUpcomingProperty;