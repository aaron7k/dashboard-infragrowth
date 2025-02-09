import React from 'react';
import { UserCheck, ExternalLink } from 'lucide-react';

interface Props {
  accountUrl: string;
}

export function ExistingAccountMessage({ accountUrl }: Props) {
  return (
    <div className="text-center">
      <div className="mb-8">
        <div className="flex justify-center mb-4">
          <UserCheck className="h-16 w-16 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-purple-900 mb-2">Cuenta Existente</h2>
        <p className="text-gray-600 mb-6">
          Ya tienes una cuenta activa en Infragrowth AI.
        </p>
      </div>

      <a
        href={accountUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full rounded-md bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Ir a mi cuenta <ExternalLink className="ml-2 h-4 w-4" />
      </a>

      <div className="mt-4 text-sm text-gray-500">
        Si tienes problemas para acceder a tu cuenta, por favor contacta a soporte.
      </div>
    </div>
  );
}
