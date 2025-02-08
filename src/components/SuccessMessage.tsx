import React from 'react';
import { CheckCircle } from 'lucide-react';

export function SuccessMessage() {
  return (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <CheckCircle className="h-16 w-16 text-purple-500" />
      </div>
      <h2 className="text-2xl font-bold text-purple-900">Cuenta Creada</h2>
      <p className="mt-2 text-gray-600">
        Se ha enviado un correo electrónico a tu dirección para activar tu cuenta.
        Por favor, revisa tu bandeja de entrada.
      </p>
    </div>
  );
}
