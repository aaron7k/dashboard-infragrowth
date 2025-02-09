// ... (código existente)

  useEffect(() => {
    document.title = 'Cuenta Creada - Infragrowth AI';
    return () => {
      document.title = 'Cuenta Infragrowth AI';
    };
  }, []);

// ... (resto del código)
