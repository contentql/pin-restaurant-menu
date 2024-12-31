export const getCurrencySymbol = (currencyCode: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  // Format a test value and extract the symbol
  const parts = formatter.formatToParts(0)

  const currencySymbol = parts.find(part => part.type === 'currency')?.value

  return currencySymbol
}
