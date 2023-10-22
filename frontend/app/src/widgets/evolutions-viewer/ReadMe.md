# Evolutions Viewer

## Logic
`findIdInChain` builds a line up to and including the target Pokémon;  
`completeEvolutionLine` adds evolutions to an existing line from a specific link;  and  
`chainToLine` is the glue that binds these two functions together into a cohesive whole.

## Display
`EvolutionsViewer` fetches the data;  
`EvolutionLine` displays the data in a line;  and  
`EvolutionTree` displays the data in a tree.  (TODO)
