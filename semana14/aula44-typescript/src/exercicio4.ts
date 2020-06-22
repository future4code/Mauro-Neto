type posts = {
    autor: string,
    texto: string
}


//a
const array: posts[] = [
    {autor: "Algum", texto: "Qualquer"}, 
    {autor: "Autor", texto: "Um texto"},
    {autor: "Mais um autor", texto: "Olá, sou um texto"},
    {autor: "Outro autor", texto: "Mais um texto"},
    {autor: "Autor", texto: "texto"}
]


//b
function filtraPosts(arr: posts[], aut: string): posts[]{
    const novoArray = arr.filter(item=>(item.autor===aut))
    
    return novoArray;
}

console.log(filtraPosts(array, "Autor"))