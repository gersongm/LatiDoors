


  export function currencyFormatter(amount: number, options: { currency?: string, decimals?: number } = {}): string   {
    const { currency = "USD", decimals = 2 } = options; // Set default values
  
    const formatter = new Intl.NumberFormat('en-US', {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
    });
    return formatter.format(amount);
  }