export function primeiraLetraMaiuscula(frase) {
    const fraseNova = frase.toLowerCase()
      .split(' ')
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.substring(1))
      .join(' ');
    
    return fraseNova;
  }