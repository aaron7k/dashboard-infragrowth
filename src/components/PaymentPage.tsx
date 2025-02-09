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

  // ... resto del componente igual ...
}
