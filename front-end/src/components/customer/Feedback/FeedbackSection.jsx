import React, { useState } from 'react';
import { Star } from 'lucide-react';

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! Rating: ${rating}, Comment: ${comment}`);
    setRating(0);
    setComment('');
  };

  return (
    <section className="mt-8 grid p-4 md:p-6 grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-surface-container-low p-6 border border-surface-variant rounded-lg">
        <h2 className="font-h2 text-h2 text-black mb-3 uppercase tracking-tight">Your Feedback</h2>
        <p className="font-body-md text-secondary mb-4">
          How was your dining experience today? Your insights help us maintain our standard of excellence.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                aria-pressed={star <= rating}
                className="p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
              >
                <Star
                  className={`h-6 w-6 ${star <= rating ? 'text-black' : 'text-secondary'}`}
                  fill={star <= rating ? 'currentColor' : 'none'}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-white border border-surface-variant p-3 font-body-sm focus:border-primary outline-none transition-colors rounded-md"
            placeholder="Write your thoughts..."
            rows="3"
          />
          <button type="submit" className="bg-black text-white font-button text-button px-6 py-2 uppercase rounded-md">
            Submit
          </button>
        </form>
      </div>
      <div className="p-6 flex flex-col justify-center bg-white rounded-lg border border-surface-variant">
        <h2 className="font-h2 text-h2 text-secondary mb-3 uppercase tracking-tight">Location & Hours</h2>
        <div className="space-y-3 font-body-md text-secondary">
          <p className="flex items-center gap-2">
            <svg className="w-4 h-4 text-secondary" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor" />
            </svg>
            124 Design Avenue, Studio City
          </p>
          <p className="flex items-center gap-2">
            <svg className="w-4 h-4 text-secondary" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm1 12.59V6h-2v7l6.25 3.75 1-1.6z" fill="currentColor" />
            </svg>
            Mon – Sun: 17:00 – 23:00
          </p>
          <p className="flex items-center gap-2">
            <svg className="w-4 h-4 text-secondary" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.05l-2.2 2.2z" fill="currentColor" />
            </svg>
            +1 (555) 890-2344
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-surface-variant">
          <h3 className="font-label-caps text-label-caps uppercase text-black mb-2">Dietary Notice</h3>
          <p className="font-body-sm text-secondary text-sm">
            Please inform your server of any allergies or dietary restrictions. Consuming raw or undercooked meats, poultry,
            seafood, shellfish, or eggs may increase your risk of foodborne illness.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
