import React from 'react';
import { XCircle } from 'lucide-react';

export function PaymentCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950">
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg text-center">
          <div className="mb-4 flex justify-center">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Pago Cancelado</h2>
          <p className="text-gray-600 mb-6">
            El proceso de pago ha sido cancelado. No se ha realizado ningún cargo.
          </p>
          <a
            href="/"
            className="inline-block rounded-md bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}
