import React, { useState } from 'react';
import { AlertCircle, Search } from 'lucide-react';

interface Props {
  onSubmit: (data: {
    name: string;
    whatsapp: string;
    email: string;
    agencyName: string;
  }) => Promise<void>;
}

export function RegistrationForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    agencyName: '',
  });
  const [countryCode, setCountryCode] = useState('+54');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCountryListOpen, setIsCountryListOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const fullWhatsApp = `${countryCode}${formData.whatsapp}`;
    
    await onSubmit({
      ...formData,
      whatsapp: fullWhatsApp,
    });
  };

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    setIsCountryListOpen(false);
  };

  const selectedCountry = countryOptions.find(country => country.code === countryCode);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre Completo
        </label>
        <input
          type="text"
          id="name"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
          WhatsApp
        </label>
        <div className="mt-1 flex relative">
          <div className="relative">
            <button
              type="button"
              className="rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              onClick={() => setIsCountryListOpen(!isCountryListOpen)}
            >
              {selectedCountry ? (
                <span>
                  {selectedCountry.flag} {selectedCountry.code}
                </span>
              ) : (
                '+54'
              )}
            </button>
            
            {isCountryListOpen && (
              <div className="absolute left-0 z-10 mt-1 w-72 rounded-md bg-white shadow-lg">
                <div className="p-2 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-8 pr-4 py-2 border rounded-md focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholder="Buscar país..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-auto">
                  {countryOptions.map((country) => (
                    <button
                      key={`${country.code}-${country.name}`}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-purple-50 flex items-center space-x-2"
                      onClick={() => handleCountrySelect(country.code)}
                    >
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                      <span className="text-gray-500">{country.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <input
            type="tel"
            id="whatsapp"
            required
            pattern="[0-9]*"
            inputMode="numeric"
            className="block w-full rounded-r-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={formData.whatsapp}
            onChange={(e) => {
              // Solo permitir números
              const value = e.target.value.replace(/\D/g, '');
              setFormData({ ...formData, whatsapp: value });
            }}
            placeholder="Ejemplo: 3001234567"
          />
        </div>
        <div className="mt-2 flex items-center text-sm text-amber-600">
          <AlertCircle className="mr-2 h-4 w-4" />
          <p>El número debe coincidir con el que está en los grupos de WhatsApp de la academia</p>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="agencyName" className="block text-sm font-medium text-gray-700">
          Nombre de tu Agencia/Negocio
        </label>
        <input
          type="text"
          id="agencyName"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          value={formData.agencyName}
          onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Crear Cuenta
      </button>
    </form>
  );
}

const countryOptions = [
  // América del Norte
  { code: '+1', flag: '🇺🇸', name: 'Estados Unidos' },
  { code: '+1', flag: '🇨🇦', name: 'Canadá' },
  { code: '+52', flag: '🇲🇽', name: 'México' },

  // América Central y Caribe
  { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
  { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: '+504', flag: '🇭🇳', name: 'Honduras' },
  { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
  { code: '+507', flag: '🇵🇦', name: 'Panamá' },
  { code: '+1', flag: '🇵🇷', name: 'Puerto Rico' },
  { code: '+1', flag: '🇩🇴', name: 'República Dominicana' },

  // América del Sur
  { code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: '+55', flag: '🇧🇷', name: 'Brasil' },
  { code: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
  { code: '+51', flag: '🇵🇪', name: 'Perú' },
  { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
  { code: '+58', flag: '🇻🇪', name: 'Venezuela' },

  // Europa
  { code: '+34', flag: '🇪🇸', name: 'España' },
];
