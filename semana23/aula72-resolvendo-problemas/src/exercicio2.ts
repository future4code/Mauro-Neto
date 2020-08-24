const stringCompression = (str: string): string => {
    const arr = []
    let count=1;

    for(let i=0; i<str.length; i++){

        if(str[i]===str[i+1]){
            count++;
        }
        else{
            arr.push(str[i], count.toString());
            count = 1;
        }
    }

    if(arr.join('').length <= str.length){
        return arr.join('')
    }

    return str;
}

console.log(stringCompression("aabbb"))
console.log(stringCompression("aabcccccaaa"))
console.log(stringCompression("accurate"))
console.log(stringCompression("escola"))
console.log(stringCompression("accuraaaaaaaaaate"))