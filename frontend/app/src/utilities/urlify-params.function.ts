////////////////////////////////////////////////////////////////////////////////
export const urlifyParams = <ParamsType extends {}>(params: ParamsType): string => {

    // Validate input
    const keys = Object.keys(params) as Array<keyof ParamsType>;
    if(keys.length <= 0) return '';

    // Convert input into output
    let output = '?';
    for(let i = 0; i < keys.length; i++) {
        if(i > 0) output += '&';

        const key = keys[i]!;
        const param = params[key]!;

        const left = encodeURIComponent(key.toString(10));
        const right = encodeURIComponent(param.toString()); //WARN: No way to specify radix on this `String` conversion.
        output += `${left}=${right}`;
    }
    return output;
};
