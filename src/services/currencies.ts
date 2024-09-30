const currencySymbols: Record<string, string> = {
  USD: "$", // US Dollar
  EUR: "€", // Euro
  INR: "₹", // Indian Rupee
  GBP: "£", // British Pound
  JPY: "¥", // Japanese Yen
  AUD: "A$", // Australian Dollar
  CAD: "C$", // Canadian Dollar
};

function getCurrencySymbol(currencyCode: string): string {
  return currencySymbols[currencyCode] || ""; // Return empty string if no symbol is found
}

export default getCurrencySymbol;
