import React, { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';

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

  const handleSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setStatus('Iniciando proceso de pago...');

      // Guardar los datos del formulario en sessionStorage
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
      console.log('Response:', data);

      if (!response.ok || !data.url) {
        throw new Error('Error al crear la sesión de pago');
      }

      // Redirección a Stripe
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
      <div className="mb-8">
        <div className="flex justify-center mb-4">
          <CreditCard className="h-16 w-16 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-purple-900 mb-2">Suscripción Premium</h2>
        <p className="text-gray-600 mb-6">
          Para continuar, es necesario activar tu suscripción premium
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="text-4xl font-bold text-purple-900 mb-2">$50 USD</div>
        <div className="text-gray-600">por mes</div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-green-500">✓</span>
          <span>Acceso completo a todas las funcionalidades</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-green-500">✓</span>
          <span>Soporte prioritario</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-green-500">✓</span>
          <span>Actualizaciones premium</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {status && (
        <div className="mb-4 p-4 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {status}
        </div>
      )}

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full rounded-md bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Procesando...' : 'Activar Suscripción'}
      </button>
    </div>
  );
}
