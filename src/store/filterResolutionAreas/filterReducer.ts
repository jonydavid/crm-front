const typesFilter = {
    setFilter: 'set - filter'
}

const initialFilter = 0;

const filterReducer = (state:any, action:any) => {
    switch (action.type) {
        case typesFilter.setFilter:
            return {
                ...state,
                type: action.payload
            }
        default: 
            return state;
    }
}

export {initialFilter, typesFilter}
export default filterReducer