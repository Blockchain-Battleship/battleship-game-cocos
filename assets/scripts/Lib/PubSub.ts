export class PubSub
{
    static registry = {};

    static publish = function(name: string, ...args: any) {
        if (!this.registry[name]) return;

        this.registry[name].forEach(x => {
            x.apply(null, args);
        });
    };


     static subscribe = function(name: string, fn: any) {
        if (!this.registry[name]) {
            this.registry[name] = [fn];
        } else {
            this.registry[name].push(fn);
        }
    };
}

 