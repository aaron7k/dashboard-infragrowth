import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function SuccessPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const createAccount = async () => {
      try {
        // Obtener los datos del sessionStorage
        const formData = JSON.parse(sessionStorage.getItem('formData') || '{}');
        
        // Llamar a la webhook
        await fetch('https://flows.axelriveroc.com/webhook/create-subaccount/create-account', {
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
            country: formData.country || 'AR' // País por defecto si no se especifica
          })
        });

        // Limpiar los datos almacenados
        sessionStorage.removeItem('formData');
        
        // Redireccionar a la aplicación principal
        window.location.href = 'https://app.infra-growth.com/';
      } catch (error) {
        console.error('Error creating account:', error);
        // Aún redirigimos en caso de error para no bloquear al usuario
        window.location.href = 'https://app.infra-growth.com/';
      }
    };

    createAccount();
  }, []);

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
        </div>
      </div>
    </div>
  );
}
