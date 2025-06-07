import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddFutureDevelopment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    expected_start: '',
    expected_completion: '',
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await api.futureDevelopments.create(formData);
      const developmentId = response.data.id;
      
      if (images.length > 0) {
        await api.futureDevelopments.uploadImages(developmentId, images);
      }
      
      navigate('/admin/future-developments');
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="future-dev-container">
      <div className="dev-form">
        <h1 className="future-dev-title">Add New Development</h1>
        
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Expected Start Date</label>
              <input
                type="date"
                name="expected_start"
                value={formData.expected_start}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Expected Completion Date</label>
              <input
                type="date"
                name="expected_completion"
                value={formData.expected_completion}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
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
            <label className="form-label">Images</label>
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
                {images.length} file(s) selected
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
              {isSubmitting ? 'Saving...' : 'Save Development'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFutureDevelopment;