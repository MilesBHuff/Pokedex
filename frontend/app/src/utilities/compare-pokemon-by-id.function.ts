////////////////////////////////////////////////////////////////////////////////
/** Figure out whether two `Array`s of Pokemon are identical.
 * @returns whether the two `Array`s have the same Pokémon in them.
**/
export const comparePokemonsById = <T extends {id: number}>(
    list1: ReadonlyArray<T>,
    list2: ReadonlyArray<T>,
): boolean => {
    if(list1.length !== list2.length) return false;
    for(let i = 0; i < list1.length; i++) {
        if(list1[i]!.id !== list2[i]!.id) return false;
    }
    return true;
};
