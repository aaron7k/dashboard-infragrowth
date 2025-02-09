// ... (código existente)

  useEffect(() => {
    document.title = 'Pago Cancelado - Infragrowth AI';
    return () => {
      document.title = 'Cuenta Infragrowth AI';
    };
  }, []);

// ... (resto del código)
