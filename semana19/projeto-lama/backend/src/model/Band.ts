export class Band{
    constructor(
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string
    ){}

    public getId(){
        return this.id
    }

    public getName(){
        return this.name
    }

    public getMusicGenre(){
        return this.music_genre
    }

    public getResponsible(){
        return this.responsible
    }

    public static dataToBandModel(band: any): Band{
        return new Band(band.id, band.name, band.music_genre, band.responsible)
    }
}

export interface RegisterBandDTO{
    name: string, 
    music_genre: string, 
    responsible: string
}