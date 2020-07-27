export enum LOCATION {
    EUA = "EUA",
    BRAZIL = "BRAZIL",
}
  
export enum NACIONALITY {
    BRAZILIAN = "BRAZILIAN",
    AMERICAN = "AMERICAN",
}

export interface CasinoUser {
    name: string;
    age: number;
    nacionality: NACIONALITY;
}

export interface Casino {
    name: string;
    location: LOCATION;
}

export interface Result {
    brazilians: ResultItem;
    americans: ResultItem;
}
  
export interface ResultItem {
    allowed: string[];
    unallowed: string[];
}

export function verifyAge(casino: Casino, users: CasinoUser[]): Result{
    const brazilians: ResultItem = {
        allowed: [],
        unallowed: []
    };
    const americans: ResultItem = {
        allowed: [],
        unallowed: []
    };

    for(const user of users){
        if(casino.location === LOCATION.BRAZIL){
            if(user.age>=18){
                if(user.nacionality === NACIONALITY.BRAZILIAN){
                    brazilians.allowed.push(user.name)
                }
                else{
                    americans.allowed.push(user.name)
                }
            }
            else{
                if(user.nacionality === NACIONALITY.BRAZILIAN){
                    brazilians.unallowed.push(user.name)
                }
                else{
                    americans.unallowed.push(user.name)
                }
            }
        }
        else{
            if(user.age>=21){
                if(user.nacionality === NACIONALITY.AMERICAN){
                    americans.allowed.push(user.name)
                }
                else{
                    brazilians.allowed.push(user.name)
                }
            }
            else{
                if(user.nacionality === NACIONALITY.AMERICAN){
                    americans.unallowed.push(user.name)
                }
                else{
                    brazilians.unallowed.push(user.name)
                }
            }
        }
    }

    return {brazilians, americans}
}