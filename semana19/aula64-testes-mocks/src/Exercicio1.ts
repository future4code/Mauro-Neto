export interface Character{
    name: string,
    life: number,
    strength: number,
    defense: number
}

export const validateCharacter = (input: Character): boolean => {
    if(input.name.trim() !== "" && input.life >= 0 && input.strength >= 0 && input.defense >= 0){
        return true;
    }
    
    return false;
}