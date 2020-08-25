/*
Podemos representar uma matriz em TypeScript como um "array de arrays". O exemplo fica assim:
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
*/

const replaceValue = (matrix: number[][], row: number, column: number, valueToReplace: number): void => {
    if(!matrix[row] || !matrix[row][column]){
        throw new Error("Fora do intervalo da matriz");
    }

    matrix[row][column] = valueToReplace;
}

const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

replaceValue(matrix, 2, 2, 5);

console.log(matrix);

// replaceValue(matrix, 4, 2, 1);