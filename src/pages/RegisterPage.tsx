import React, { useState } from 'react';
import { RegistrationForm } from '../components/RegistrationForm';
import { SuccessMessage } from '../components/SuccessMessage';
import { PaymentPage } from '../components/PaymentPage';
import type { RegistrationForm as RegistrationFormType, ApiResponse } from '../types';

export function RegisterPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormType | null>(null);

  const handleSubmit = async (data: RegistrationFormType) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://flows.axelriveroc.com/webhook/create-subaccount/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'CJ4d3E4sBFkNSD7A'
        },
        body: JSON.stringify(data)
      });

      const responseData: ApiResponse = await response.json();

      if (responseData['no-cost']) {
        setIsSuccess(true);
      } else {
        setFormData(data);
        setShowPayment(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar tu registro. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950">
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          {!isSuccess && !showPayment ? (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-purple-900">Crear Cuenta</h1>
                <p className="mt-2 text-gray-600">
                  Completa el registro para crear cuenta en Infragrowth AI
                </p>
              </div>
              <RegistrationForm onSubmit={handleSubmit} />
            </>
          ) : showPayment && formData ? (
            <PaymentPage formData={formData} />
          ) : (
            <SuccessMessage />
          )}
        </div>
      </div>
    </div>
  );
}
