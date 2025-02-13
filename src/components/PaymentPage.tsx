import React, { useState, useMemo } from 'react';
import { CreditCard, Loader2, AlertCircle, ArrowLeft, Calendar, X } from 'lucide-react';

interface Props {
  formData: {
    name: string;
    email: string;
    whatsapp: string;
    agencyName: string;
  };
}

export default function PaymentPage({ formData }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Create a memoized calendar URL with dynamic parameters
  const calendarUrl = useMemo(() => {
    const baseUrl = 'https://site.infragrowthai.com/widget/booking/jAO7l4dBqBqs8wxk2Jtd';
    const params = new URLSearchParams({
      'first_name': formData.name.split(' ')[0], // First name
      'email': formData.email,
      'phone': formData.whatsapp
    });
    return `${baseUrl}?${params.toString()}`;
  }, [formData]);

  // Rest of the component remains the same as in the previous version...

  return (
    <div className="text-center">
      {/* ... previous code remains the same ... */}

      {showCalendarModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => setShowCalendarModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCalendarModal(false)}
              className="absolute top-4 right-4 z-60 text-gray-600 hover:text-gray-900"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="p-6 h-full">
              <iframe 
                src={calendarUrl}
                className="w-full h-[70vh] border-none"
                scrolling="yes"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* ... rest of the component remains the same ... */}
    </div>
  );
}
