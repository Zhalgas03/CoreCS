export function formatPrice(
  price: number,
  currency: "USD" | "EUR" | "RUB"
) {
  if (currency === "USD") return `$${price}`
  if (currency === "EUR") return `€${price}`
  if (currency === "RUB") return `${price} ₽`

  return price.toString()
}
