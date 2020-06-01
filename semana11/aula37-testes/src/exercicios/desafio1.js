export function ordenaArray(array) {
    let i, j, aux;

    for(i=1; i<array.length; i++){
        for(j=0; j<array.length-i; j++){
            if(array[j] > array[j+1]){
                aux = array[j];
                array[j]=array[j+1];
                array[j+1]=aux;
            }
        }
    }
    
    return array;
}