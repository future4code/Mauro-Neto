const printMatrix = (matrix: number[][]): void => {
    for(let i=0; i<matrix.length; i++){
        for(let j=0; j<matrix[i].length; j++){
            console.log(matrix[i][j])
        }
    }
}

const matrix2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
printMatrix(matrix2);

const sumMatrix = (matrix1: number[][], matrix2: number[][]): number[][] => {
    if((matrix1.length !== matrix2.length) || (matrix1[0].length !== matrix2[0].length)){
        throw new Error("As dimensões das matrizes devem ser iguais");
    }

    const rowSize = matrix1.length;
    const columnSize = matrix1[0].length;

    const newMatrix: number[][] = [];

    for(let i=0; i < rowSize; i++){
        const newRow: number[] = [];
        for(let j=0; j < columnSize; j++){
            newRow.push(matrix1[i][j]+matrix2[i][j]);
        }
        newMatrix.push(newRow);
    }

    return newMatrix;
}

const matrix3 = [[2, 0], [-1, 5]];
const matrix4 = [[1, 4], [-2, 0]];

console.log(sumMatrix(matrix3, matrix4));

const transposeMatrix = (matrix: number[][]): number[][] => {
    const transposedMatrix: number[][] = [];

    for(let j=0; j < matrix[0].length; j++){
        let row: number[] = [];
        for(let i=0; i < matrix.length; i++){
            row.push(matrix[i][j])
        }
        transposedMatrix.push(row);
    }

    return transposedMatrix;
}

const matrix5 = [[3, 2], [4, 5]];

console.log(transposeMatrix(matrix5));

const multiplyMatrix = (matrix1: number[][], matrix2: number[][]): number[][] => {
    if(matrix1[0].length !== matrix2.length){
        throw new Error("A quantidade de colunas da matriz 1 deve ser igual a quantidade de linhas da matriz 2")
    }

    const newMatrix: number[][] = []

    for(let i=0; i < matrix1.length; i++ ){
        const row: number[] = [];
        for(let j=0; j < matrix2[0].length; j++){
            let sum = 0;
            for(let k=0; k < matrix1[0].length; k++){
                sum += matrix1[i][k] * matrix2[k][j];
            }
            row.push(sum);
        }
        newMatrix.push(row);
    }

    return newMatrix;
}

const matrix6 = [[1,2], [3, 4]];
const matrix7 = [[-1, 3], [4, 2]];
const matrix8 = [[2, 3], [0, 1], [-1, 4]];
const matrix9 = [[1, 2, 3], [-2, 0, 4]];

console.log(multiplyMatrix(matrix6, matrix7));
console.log(multiplyMatrix(matrix8, matrix9));
console.log(multiplyMatrix(matrix9, matrix8));