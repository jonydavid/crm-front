import { createContext, useContext, useReducer } from "react";
import filterReducer, { initialFilter } from "./filterReducer";

const FilterContext = createContext<any>({});

const FilterProvider = ({children}:any) => 
    <FilterContext.Provider value={useReducer(filterReducer, initialFilter)}>
        {children}
    </FilterContext.Provider>

const useStoreFilter = () => useContext(FilterContext)[0];
const useDispatchFilter = () => useContext(FilterContext)[1];


export {FilterContext, useStoreFilter, useDispatchFilter};
export default FilterProvider;