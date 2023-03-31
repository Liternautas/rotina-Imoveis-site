import {useContext} from 'react';
import { FilterContext } from '../FilterContext';

function useFilter() {
    return useContext(FilterContext);
}

export default useFilter;