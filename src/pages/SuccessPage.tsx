import React, { useEffect, useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

export function SuccessPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createAccount = async () => {
      try {
        // Recuperar datos guardados
        const formData = JSON.parse(sessionStorage.getItem('formData') || '{}');
        
        // Obtener todos los parámetros posibles de la URL de Stripe
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        const paymentStatus = urlParams.get('payment_status');
        const customerId = urlParams.get('customer');
        const subscriptionId = urlParams.get('subscription'); // Intentamos obtener subscription_id si está disponible

        console.log('Stripe URL Params:', {
          sessionId,
          paymentStatus,
          customerId,
          subscriptionId
        });

        // Enviar datos a tu endpoint
        const response = await fetch('https://flows.axelriveroc.com/webhook/create-subaccount/create-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'CJ4d3E4sBFkNSD7A'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            agencyName: formData.agencyName,
            stripeData: {
              sessionId,
              paymentStatus,
              customerId,
              subscriptionId // Lo incluimos si está disponible
            }
          })
        });

        if (response.status === 200) {
          // Limpiar datos almacenados
          sessionStorage.removeItem('formData');
          // Redirigir a la aplicación principal
          window.location.href = 'https://app.infra-growth.com/';
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al crear la cuenta');
        }
      } catch (error) {
        console.error('Error creating account:', error);
        setError('Hubo un error al crear tu cuenta. Por favor, contacta a soporte.');
        setLoading(false);
      }
    };

    createAccount();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950">
        <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg text-center">
            <div className="mb-4 flex justify-center">
              <CheckCircle className="h-16 w-16 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Error en el Proceso</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-purple-600 hover:text-purple-500"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950">
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-purple-900 mb-4">¡Pago Exitoso!</h2>
          <p className="text-gray-600 mb-6">
            Tu suscripción ha sido activada correctamente. Estás siendo redirigido...
          </p>
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
