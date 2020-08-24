const verifyOneEdit = (str1: string, str2: string): boolean => {
    let diffChars = 0;

    for(let i=0; i<str2.length; i++){
        if(str2[i] !== str1[i]){
            diffChars++;
        }
    }

    return (diffChars === 1 || (diffChars===0 && (str2.length === str1.length-1 || str2.length === str1.length+1)));
}

console.log(verifyOneEdit("banana", "banan"))
console.log(verifyOneEdit("banana", "bananak"))
console.log(verifyOneEdit("banana", "panana"))
console.log(verifyOneEdit("banana", "bananaaa"))
console.log(verifyOneEdit("banana", "banana"))