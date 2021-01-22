import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      filteredProducts: [...action.payload],
      allProducts: [...action.payload],
    }
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      gridView: true,
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      gridView: false,
    };
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    }
  }

  if (action.type === SORT_PRODUCTS) {
    const {sort, filteredProducts} = state;
    let tempProducts = [...filteredProducts];
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a,b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a,b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a,b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a,b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return {
      ...state,
      filteredProducts: tempProducts,
    };
  }


  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
