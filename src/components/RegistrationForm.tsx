// ... (imports se mantienen igual)

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
  { code: '+53', flag: '🇨🇺', name: 'Cuba' },
  { code: '+1', flag: '🇯🇲', name: 'Jamaica' },

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
  { code: '+44', flag: '🇬🇧', name: 'Reino Unido' },
  { code: '+49', flag: '🇩🇪', name: 'Alemania' },
  { code: '+33', flag: '🇫🇷', name: 'Francia' },
  { code: '+39', flag: '🇮🇹', name: 'Italia' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+31', flag: '🇳🇱', name: 'Países Bajos' },
  { code: '+41', flag: '🇨🇭', name: 'Suiza' },
  { code: '+32', flag: '🇧🇪', name: 'Bélgica' },
  { code: '+46', flag: '🇸🇪', name: 'Suecia' },
  { code: '+47', flag: '🇳🇴', name: 'Noruega' },
  { code: '+45', flag: '🇩🇰', name: 'Dinamarca' },
  { code: '+358', flag: '🇫🇮', name: 'Finlandia' },
  { code: '+48', flag: '🇵🇱', name: 'Polonia' },
  { code: '+43', flag: '🇦🇹', name: 'Austria' },
  { code: '+30', flag: '🇬🇷', name: 'Grecia' },
  { code: '+353', flag: '🇮🇪', name: 'Irlanda' },

  // Asia
  { code: '+81', flag: '🇯🇵', name: 'Japón' },
  { code: '+82', flag: '🇰🇷', name: 'Corea del Sur' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
  { code: '+65', flag: '🇸🇬', name: 'Singapur' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+972', flag: '🇮🇱', name: 'Israel' },
  { code: '+971', flag: '🇦🇪', name: 'Emiratos Árabes Unidos' },

  // Oceanía
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+64', flag: '🇳🇿', name: 'Nueva Zelanda' },
];

// ... (el resto del componente se mantiene igual)
