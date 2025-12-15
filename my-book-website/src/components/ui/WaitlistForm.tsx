import React, { useState } from 'react';
import Button from './Button';
import { saveWaitlistSignup } from '../utils/storage';

interface FormData {
  email: string;
}

interface WaitlistFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ onSuccess, onError, className = '' }) => {
  const [formData, setFormData] = useState<FormData>({ email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!validateEmail(formData.email)) {
      const errorMsg = 'Please enter a valid email address';
      setError(errorMsg);
      if (onError) onError(errorMsg);
      setIsSubmitting(false);
      return;
    }

    try {
      // Save to localStorage using our utility function
      saveWaitlistSignup({
        id: `signup_${Date.now()}`,
        email: formData.email,
        timestamp: new Date().toISOString(),
        status: 'active'
      });

      // Clear form
      setFormData({ email: '' });
      
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMsg = 'Failed to save your signup. Please try again.';
      setError(errorMsg);
      if (onError) onError(errorMsg);
      console.error('Waitlist signup error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      email: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="form-group">
        <div className="input-group">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <Button 
            type="submit" 
            variant="premium"
            disabled={isSubmitting}
            className="ml-2"
          >
            {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
          </Button>
        </div>
        {error && (
          <div className="form-text text-danger margin-top--sm">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default WaitlistForm;