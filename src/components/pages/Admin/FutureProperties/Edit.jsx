import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EditFutureDevelopment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    expected_start: '',
    expected_completion: '',
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDevelopment = async () => {
      try {
        const response = await api.futureDevelopments.getById(id);
        const data = response.data;
        setFormData({
          title: data.title,
          description: data.description,
          location: data.location,
          expected_start: data.expected_start.split('T')[0],
          expected_completion: data.expected_completion.split('T')[0],
        });
        setExistingImages(data.images || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDevelopment();
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
      await api.futureDevelopments.deleteImage(id, { image_id: imageId });
      setExistingImages(existingImages.filter(img => img.id !== imageId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await api.futureDevelopments.update(id, formData);
      
      if (images.length > 0) {
        await api.futureDevelopments.uploadImages(id, images);
      }
      
      navigate('/admin/future-developments');
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <div className="future-dev-container">
      <div className="dev-form">
        <h1 className="future-dev-title">Edit Development</h1>
        
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Same form fields as AddFutureDevelopment */}
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="5"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Existing Images</label>
            <div className="image-preview-grid">
              {existingImages.map(image => (
                <div key={image.id} className="image-preview">
                  <img src={image.image} alt="Development" />
                  <button
                    type="button"
                    className="delete-image-btn"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Add New Images</label>
            <div className="image-upload-area">
              <label className="image-upload-label">
                <span>Upload Images</span>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="d-none"
                  accept="image/*"
                />
              </label>
            </div>
            {images.length > 0 && (
              <div className="selected-images-count">
                {images.length} new file(s) selected
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/admin/future-developments')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Development'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFutureDevelopment;