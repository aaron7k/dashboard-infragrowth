// ... (código existente)

  useEffect(() => {
    // Actualizar el título cuando se monta el componente
    document.title = 'Suscripción Premium - Infragrowth AI';
    
    // Restaurar el título original cuando se desmonta
    return () => {
      document.title = 'Cuenta Infragrowth AI';
    };
  }, []);

// ... (resto del código)
