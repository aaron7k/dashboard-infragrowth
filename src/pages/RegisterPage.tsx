import React, { useState } from 'react';
import { RegistrationForm } from '../components/RegistrationForm';
import { SuccessMessage } from '../components/SuccessMessage';
import PaymentPage from '../components/PaymentPage';
import { ExistingAccountMessage } from '../components/ExistingAccountMessage';
import { Loader2 } from 'lucide-react';
import type { RegistrationForm as RegistrationFormType } from '../types';

interface ApiResponse {
  'no-cost'?: boolean;
  id?: string;
  url?: string;
}

export function RegisterPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [existingAccount, setExistingAccount] = useState<{url: string} | null>(null);
  const [formData, setFormData] = useState<RegistrationFormType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createAccount = async (data: RegistrationFormType) => {
    try {
      const response = await fetch('https://flows.axelriveroc.com/webhook/create-subaccount/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'CJ4d3E4sBFkNSD7A'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          agencyName: data.agencyName
        })
      });

      if (response.status === 200) {
        setIsSuccess(true);
        setShowPayment(false);
      } else {
        throw new Error('Error al crear la cuenta');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setError('Error al crear la cuenta. Por favor, intenta nuevamente.');
    }
  };

  const handleSubmit = async (data: RegistrationFormType) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('https://flows.axelriveroc.com/webhook/create-subaccount/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'CJ4d3E4sBFkNSD7A'
        },
        body: JSON.stringify(data)
      });

      const responseData: ApiResponse = await response.json();
      console.log('Search response:', responseData);

      if (responseData['no-cost'] === true) {
        console.log('No-cost account, creating...');
        await createAccount(data);
      } else if (responseData.url) {
        setExistingAccount({ url: responseData.url });
      } else {
        setFormData(data);
        setShowPayment(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un error al procesar tu registro. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto" />
          <p className="mt-4 text-gray-600">Procesando tu solicitud...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950">
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          {error ? (
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-purple-600 hover:text-purple-500"
              >
                Intentar nuevamente
              </button>
            </div>
          ) : existingAccount ? (
            <ExistingAccountMessage accountUrl={existingAccount.url} />
          ) : isSuccess ? (
            <SuccessMessage />
          ) : showPayment && formData ? (
            <PaymentPage formData={formData} />
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-purple-900">Crear Cuenta</h1>
                <p className="mt-2 text-gray-600">
                  Completa el registro para crear cuenta en Infragrowth AI
                </p>
              </div>
              <RegistrationForm onSubmit={handleSubmit} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
