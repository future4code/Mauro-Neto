import * as fs from 'fs'

const arquivo: string = process.argv[2]
const novaTarefa: string = process.argv[3] + "\n"

fs.appendFileSync(arquivo, novaTarefa);