import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { Card, CardContent } from '@site/src/components/ui/Card';
import Button from '@site/src/components/ui/Button';
import { saveWaitlistSignup, loadWaitlistSignups } from '@site/src/utils/storage';

interface FormData {
  email: string;
}

export default function Contact(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({ email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    // More robust email validation
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Additional checks
    if (email.length > 254) return false; // Email too long
    if (!re.test(email)) return false; // Format validation

    // Extract domain and validate
    const domain = email.substring(email.lastIndexOf('@') + 1);
    if (domain.length > 253) return false; // Domain too long

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    if (!validateEmail(formData.email)) {
      setSubmitError('Please enter a valid email address');
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

      setSubmitSuccess(true);
      setFormData({ email: '' });
    } catch (error) {
      setSubmitError('Failed to save your signup. Please try again.');
      console.error('Waitlist signup error:', error);
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
    <Layout title="Contact" description="Sign up for updates on AI-Native development resources">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <Card variant="glass">
              <CardContent>
                <header className="hero hero--primary">
                  <div className="container">
                    <h1 className="hero__title gradient-text">Stay Updated</h1>
                  </div>
                </header>
                
                <div className="margin-vert--lg">
                  <p>
                    Sign up for our waitlist to receive updates when new content and resources become available.
                  </p>
                  
                  {submitSuccess ? (
                    <div className="alert alert--success margin-vert--md">
                      Thank you for signing up! We'll notify you when new content is available.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="margin-vert--lg">
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      {submitError && (
                        <div className="alert alert--danger margin-vert--md">
                          {submitError}
                        </div>
                      )}
                      
                      <div className="margin-vert--md">
                        <Button 
                          type="submit" 
                          variant="premium"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}