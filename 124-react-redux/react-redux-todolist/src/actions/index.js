export function addTodo(text){
    return{
        type:"ADD_TODO",
        text
    }
}
export function toggleTodo(index){
    return{
        type:"TOGGLE_TODO",
        index
    }
}
export function setVisibilityFilter(filter){
    return{
        type:"SET_VISIBILITY_FILTER",
        filter
    }
}
export const VisibilitiFilters = {
    SHOW_ALL:"SHOW_ALL",
    SHOW_COMPLETED:"SHOW_COMPLETED",
    SHOW_ACTIVE:"SHOW_ACTIVE"
}
