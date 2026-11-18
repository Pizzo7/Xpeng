/** Format Ghana Cedi amounts as GH₵ 000,000 */
export function formatGhs(amount: number): string {
  const formatted = new Intl.NumberFormat("en-GH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `GH₵ ${formatted}`;
}

export function formatPhoneDisplay(phone: string): string {
  return phone;
}
