// ... (imports y countryOptions se mantienen igual)

export function RegistrationForm({ onSubmit }: Props) {
  // ... (estados iniciales se mantienen igual)

  const validateWhatsApp = (number: string) => {
    // Remover todos los espacios
    const trimmedNumber = number.trim();
    
    // Verificar que solo contenga números
    const numberOnly = /^\d+$/.test(trimmedNumber);
    
    if (!numberOnly) {
      setWhatsappError('El número solo debe contener dígitos');
      return false;
    }

    // Verificar longitud (entre 8 y 15 dígitos)
    if (trimmedNumber.length < 8 || trimmedNumber.length > 15) {
      setWhatsappError('El número debe tener entre 8 y 15 dígitos');
      return false;
    }

    return true;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Solo permitir números
    const sanitizedValue = value.replace(/\D/g, '');
    
    setFormData({ ...formData, whatsapp: sanitizedValue });
    
    if (sanitizedValue) {
      validateWhatsApp(sanitizedValue);
    } else {
      setWhatsappError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar WhatsApp antes de enviar
    if (!validateWhatsApp(formData.whatsapp)) {
      return;
    }

    const fullWhatsApp = `${countryCode}${formData.whatsapp}`;
    
    await onSubmit({
      ...formData,
      whatsapp: fullWhatsApp,
    });
  };

  // ... (resto del JSX se mantiene igual, pero actualizamos el input de WhatsApp)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ... otros campos ... */}
      
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
          WhatsApp
        </label>
        <div className="mt-1 flex relative">
          <div className="relative">
            {/* ... código del selector de país ... */}
          </div>
          <input
            type="tel"
            id="whatsapp"
            required
            inputMode="numeric"
            pattern="[0-9]*"
            className={`block w-full rounded-r-md border ${
              whatsappError ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`}
            value={formData.whatsapp}
            onChange={handleWhatsAppChange}
            placeholder="Ejemplo: 3001234567"
          />
        </div>
        {whatsappError && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {whatsappError}
          </p>
        )}
        <div className="mt-2 flex items-center text-sm text-amber-600">
          <AlertCircle className="mr-2 h-4 w-4" />
          <p>El número debe coincidir con el que está en los grupos de WhatsApp de la academia</p>
        </div>
      </div>

      {/* ... resto del formulario ... */}
    </form>
  );
}
