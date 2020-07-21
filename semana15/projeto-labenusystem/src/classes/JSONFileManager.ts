import * as fs from 'fs'

export class JSONFileManager{
    constructor(private filePath: string){}

    public setFilePath(path: string): void{
        this.filePath = path;
    }

    public writeFile(data: any): void{
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    public readFile(): any{
        return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    }
}