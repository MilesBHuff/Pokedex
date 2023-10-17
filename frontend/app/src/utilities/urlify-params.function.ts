////////////////////////////////////////////////////////////////////////////////
export const urlifyParams = <ParamsType extends {}>(params: ParamsType): string => {

    // Validate input
    const keys = Object.keys(params) as Array<keyof ParamsType>;
    if(keys.length <= 0) return '';

    // Convert input into output
    let output = '?';
    for(let i = 0; i < keys.length; i++) {
        if(i > 0) output += '&';

        const key = keys[i]!; //NOTE: Non-null assertion used to work around issue where TypeScript is unable to know that `i` is a valid index for `keys`.
        const param = params[key]!; //NOTE: Non-null assertion used to work around issue where TypeScript is unable to know that `key` is a valid key for `params`.

        const left = encodeURIComponent(key.toString(10));
        const right = encodeURIComponent(param.toString()); //WARN: No way to specify radix on this `String` conversion.
        output += `${left}=${right}`;
    }
    return output;
};
