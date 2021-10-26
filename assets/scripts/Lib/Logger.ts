export default class Logger{
    static warn = (...args) => 
    {
        console.warn(args)
    }

    static log = (...args) =>
    {
        console.log(args)
    }

    static error = (...args)=>
    {
        console.error(args)
    }

    static info = (...args) =>
    {
        console.info(args)
    }
}