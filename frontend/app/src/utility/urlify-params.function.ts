////////////////////////////////////////////////////////////////////////////////
export const urlifyParams = <ParamsType extends object>(params: ParamsType): string => {

    // Validate input
    const keys = Object.keys(params) as Array<keyof ParamsType>;
    if(keys.length <= 0) return '';

    // Convert input into output
    let output = '?';
    for(let i = 0; i < keys.length; i++) {
        if(i > 0) output += '&';
        const key = keys[i]!; //NOTE: Non-null assertion used to work around issue where TypeScript is unable to know that `i` is a valid index for `keys`.

        const left = encodeURIComponent(key.toString(10));
        const right = encodeURIComponent((params[key] ?? '').toString(/* BUG: Not sure why I can't specify a radix here. */));
        output += `${left}=${right}`;
    }
    return output;
};
