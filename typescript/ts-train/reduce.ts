

export enum EventType {
    changeLine,
    playMvPlayer,
}

const courseWare: string[] = [
    'changeLine'
];

const courseWare2: string[] = [
    'changeLine1'
];

type E = {
    [key: string]: string
}

function createEventMap(eventMap: E, eventArr: string[]) {
    return eventArr.reduce((previous: E, current: string) => {
        if(previous[current]) {
            throw new Error(`the eventType '${current}' exist!`)
        }
        previous[current] = current;
        return previous;
    }, eventMap)
}

let result = createEventMap( {}, courseWare);
result = createEventMap( result, courseWare2);
console.log(result.c)