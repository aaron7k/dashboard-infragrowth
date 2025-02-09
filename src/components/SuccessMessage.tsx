import React from 'react';
import { CheckCircle } from 'lucide-react';

export function SuccessMessage() {
  return (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-purple-900">¡Cuenta Creada!</h2>
      <p className="mt-4 text-gray-600">
        Tu cuenta ha sido creada exitosamente. Hemos enviado un correo electrónico con los detalles de acceso.
      </p>
      <div className="mt-6">
        <a
          href="https://app.infra-growth.com/"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Ir a la aplicación
        </a>
      </div>
    </div>
  );
}
