export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function calculateDiscount(originalPrice: number, discountPercent: number): number {
  return originalPrice * (1 - discountPercent / 100);
}

