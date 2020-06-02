export function checaPalindromo(frase) {
  frase = frase.toLowerCase().replace(/[^a-z0-9]+/g,"")
  return (
    frase ===
    frase
      .split("")
      .reverse()
      .join("")
  );
}