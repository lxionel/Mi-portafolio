/* WhatsApp configuration for Studio Zero */
export const WSP_NUMBER = '51952102805';

export function wspUrl(message = 'Hola Studio Zero, quiero información') {
  return `https://wa.me/${WSP_NUMBER}?text=${encodeURIComponent(message)}`;
}
