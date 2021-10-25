  export class  PubSubRegistry
{
    static registry = {};
}

let pub = function(name: string, ...args: any) {
    if (!PubSubRegistry.registry[name]) return;

    PubSubRegistry.registry[name].forEach(x => {
        x.apply(null, args);
    });
};


let sub = function(name: string, fn: any) {
    if (!PubSubRegistry.registry[name]) {
        PubSubRegistry.registry[name] = [fn];
    } else {
        PubSubRegistry.registry[name].push(fn);
    }
};

export const publish = pub
export const subscribe = sub