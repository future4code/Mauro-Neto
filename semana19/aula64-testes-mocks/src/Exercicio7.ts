import {Character} from './Exercicio1'

export const recoverCharacters = (characters: Character[], validator: (input: Character) => boolean): void => {
    for(const character of characters){
        if(!validator(character)){
            throw new Error("Invalid character")
        }
    }

    if(characters.length < 2){
        throw new Error("You need to send at least 2 characters")
    }

    characters.forEach(character => {
        character.life = 1500;
    })
}

export const increaseCharacterAttack = (character: Character, newAttack: number, validator: (input: Character)=> boolean): void => {
    if(!validator(character)){
        throw new Error("Invalid character")
    }

    if(newAttack < character.strength){
        throw new Error("Invalid new attack")
    }
    
    character.strength = newAttack;
}

export const decreaseCharacterDefense = (character: Character, newDefense: number, validator: (input: Character)=> boolean): void => {
    if(!validator(character)){
        throw new Error("Invalid character")
    }

    if((newDefense > character.defense) && (newDefense >= 0)){
        throw new Error("Invalid new defense")
    }
    character.defense = newDefense;
}