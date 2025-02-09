import React, { useState } from 'react';
import { CreditCard, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

interface Props {
  formData: {
    name: string;
    email: string;
    whatsapp: string;
    agencyName: string;
  };
}

export function PaymentPage({ formData }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  const handleBack = () => {
    window.location.reload(); // Esto es equivalente a presionar F5
  };

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);
      setStatus('Iniciando proceso de pago...');

      sessionStorage.setItem('formData', JSON.stringify(formData));

      const response = await fetch('https://flows.axelriveroc.com/webhook/create-subaccount/screrate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'CJ4d3E4sBFkNSD7A'
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          whatsapp: formData.whatsapp,
          agencyName: formData.agencyName,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`
        })
      });

      const data = await response.json();
      
      if (!response.ok || !data.url) {
        throw new Error('Error al crear la sesión de pago');
      }

      window.location.href = data.url;
      
    } catch (err) {
      console.error('Error:', err);
      setError('Ha ocurrido un error al procesar el pago. Por favor, intenta nuevamente.');
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleBack}
        className="mb-4 flex items-center text-sm text-purple-600 hover:text-purple-500"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Volver y editar información
      </button>

      {/* ... resto del JSX igual ... */}
    </div>
  );
}
