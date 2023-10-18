////////////////////////////////////////////////////////////////////////////////
export const displayifyName = (rawName: string): string => {
    rawName = rawName.replace(/-/g, ' ');
    const words = rawName.split(' ');
    let newName = '';
    for(let i = 0; i < words.length; i++) {
        const word = words[i]!;
        newName += word.charAt(0).toUpperCase() + word.substring(1);
        if(word === 'mr') newName += '.'; // Hack for Mr. Mime
        if(i < words.length - 1) newName += ' ';
    }
    return newName;
};
