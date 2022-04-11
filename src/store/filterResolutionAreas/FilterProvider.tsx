import { createContext, useContext, useReducer } from "react";
import filterReducer, { initialFilter } from "./filterReducer";

const FilterContextResolutionAreas = createContext<any>(0);

const FilterContextResolutionAreasProvider = ({children}:any) => 
    <FilterContextResolutionAreas.Provider value={useReducer(filterReducer, initialFilter)}>
        {children}
    </FilterContextResolutionAreas.Provider>

const useStoreFilter = () => useContext(FilterContextResolutionAreas)[0];
const useDispatchFilter = () => useContext(FilterContextResolutionAreas)[1];


export {FilterContextResolutionAreas, useStoreFilter, useDispatchFilter};
export default FilterContextResolutionAreasProvider;