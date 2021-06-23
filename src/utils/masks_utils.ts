export function maskPhone(e: string): string {
  let value = e.replace(/\D/g, "")

  value = value.replace(/^(\d{2})/g, "+$1")

  value = value.replace(/(\d{2})(\d{2})(\d{5})/g, "$1($2)$3")

  value = value.replace(/(\d{5})(\d{4})/g, "$1-$2")

  return value
}
