const negativeCountInMatrix = (matrix: number[][]): number => {
    let count = 0;

    for(let i=0; i < matrix.length; i++){
        if(matrix[i][0]>0){
            break;
        }
        for(let j=0; j < matrix[i].length; j++){
            if(matrix[i][j]<0){
                count++;
            }
            else{
                break;
            }
        }
    }

    return count;
}

const matrix10 = [[-3, -2, -1, 1], [-2, 2, 3, 4], [4, 5, 7, 8]]

console.log(negativeCountInMatrix(matrix10));