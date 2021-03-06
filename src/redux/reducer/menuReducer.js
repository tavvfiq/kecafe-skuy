/* eslint-disable no-lonely-if */
/* eslint-disable no-case-declarations */
/* eslint-disable no-else-return */
import {actions, pending, fulfilled, rejected} from '../action/actionTypes';
import {update} from 'ramda';
import {isEmpty} from 'underscore';

const initialState = {
  preview: {
    mainCourseMenu: [],
    dessertMenu: [],
    beverageMenu: [],
    snackMenu: [],
  },
  menu: [],
  cart: [],
  lastOrder: [],
  pageInfo: {
    prevPage: '',
    currentPage: 1,
    nextPage: '',
  },
  loading: {
    menuList: true,
    mainCoursePrev: true,
    dessertPrev: true,
    beveragePrev: true,
    snackPrev: true,
    lastOrder: true,
    addOrder: true,
  },
  error: false,
  msg: '',
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.getMenu + pending:
      switch (action.payload.menuType) {
        case 'MAIN_COURSE':
          return {
            ...state,
            loading: {
              ...state.loading,
              mainCoursePrev: true,
            },
            msg: 'loading',
          };
        case 'DESSERT':
          return {
            ...state,
            loading: {
              ...state.loading,
              dessertPrev: true,
            },
            msg: 'loading',
          };
        case 'BEVERAGE':
          return {
            ...state,
            loading: {
              ...state.loading,
              beveragePrev: true,
            },
            msg: 'loading',
          };
        case 'SNACK':
          return {
            ...state,
            loading: {
              ...state.loading,
              snackPrev: true,
            },
            msg: 'loading',
          };
        case 'ALL':
          return {
            ...state,
            loading: {
              ...state.loading,
              menuList: true,
            },
            msg: 'loading',
          };
        default:
          return state;
      }
    case actions.getMenu + fulfilled:
      switch (action.payload.menuType) {
        case 'MAIN_COURSE':
          return {
            ...state,
            preview: {
              ...state.preview,
              mainCourseMenu: action.payload.data.menu,
            },
            loading: {...state.loading, mainCoursePrev: false},
            msg: 'done',
          };
        case 'DESSERT':
          return {
            ...state,
            preview: {
              ...state.preview,
              dessertMenu: action.payload.data.menu,
            },
            loading: {...state.loading, dessertPrev: false},
            msg: 'done',
          };
        case 'BEVERAGE':
          return {
            ...state,
            preview: {
              ...state.preview,
              beverageMenu: action.payload.data.menu,
            },
            loading: {...state.loading, beveragePrev: false},
            msg: 'done',
          };
        case 'SNACK':
          return {
            ...state,
            preview: {
              ...state.preview,
              snackMenu: action.payload.data.menu,
            },
            loading: {...state.loading, snackPrev: false},
            msg: 'done',
          };
        case 'ALL':
          if (action.payload.data.pageInfo.prevPage === '') {
            if (action.payload.data.menu.length !== 0) {
              return {
                ...state,
                menu: [...action.payload.data.menu],
                loading: {...state.loading, menuList: false},
                error: false,
                msg: 'done',
                pageInfo: {
                  prevPage: action.payload.data.pageInfo.prevPage,
                  currentPage: Number(action.payload.data.pageInfo.page),
                  nextPage: action.payload.data.pageInfo.nextPage,
                },
              };
            } else {
              if (action.payload.data.pageInfo.nextPage !== '') {
                return {
                  ...state,
                  loading: {...state.loading, menuList: false},
                  error: false,
                  msg: 'done',
                  pageInfo: {
                    prevPage: action.payload.data.pageInfo.prevPage,
                    currentPage: Number(action.payload.data.pageInfo.page) + 1,
                    nextPage: action.payload.data.pageInfo.nextPage,
                  },
                };
              } else {
                return {
                  ...state,
                  menu: [],
                  loading: {...state.loading, menuList: false},
                  error: false,
                  msg: 'done',
                  pageInfo: {
                    prevPage: action.payload.data.pageInfo.prevPage,
                    currentPage: Number(action.payload.data.pageInfo.page) + 1,
                    nextPage: action.payload.data.pageInfo.nextPage,
                  },
                };
              }
            }
          }
          if (action.payload.data.pageInfo.nextPage !== '') {
            const newArr = [...state.menu];
            newArr.push(...action.payload.data.menu);
            return {
              ...state,
              menu: [...newArr],
              loading: {...state.loading, menuList: false},
              error: false,
              msg: 'done',
              pageInfo: {
                prevPage: action.payload.data.pageInfo.prevPage,
                currentPage: Number(action.payload.data.pageInfo.page) + 1,
                nextPage: action.payload.data.pageInfo.nextPage,
              },
            };
          } else {
            const newArr = [...state.menu];
            newArr.push(...action.payload.data.menu);
            return {
              ...state,
              menu: [...newArr],
              loading: {...state.loading, menuList: false},
              error: false,
              msg: 'Yay! You have seen it all',
              pageInfo: {
                prevPage: action.payload.data.pageInfo.prevPage,
                nextPage: action.payload.data.pageInfo.nextPage,
                currentPage: 1,
              },
            };
          }
        default:
          return state;
      }
    case actions.getMenu + rejected:
      return {
        ...state,
        error: true,
        msg: action.payload.error,
      };
    case actions.changeQuantity:
      let idx = state.cart.findIndex((item) => {
        return action.payload.id === item.id;
      });
      let newArr;
      if (state.cart[idx].quantity === 1 && action.payload.num < 0) {
        newArr = state.cart.filter((item) => {
          return item.id !== action.payload.id;
        });
      } else {
        newArr = update(
          idx,
          {...state.cart[idx], quantity: state.cart[idx].quantity + action.payload.num},
          state.cart
        );
      }
      return {
        ...state,
        cart: newArr,
      };

    case actions.addToCart:
      newArr = [...state.cart, action.payload.menu];
      return {
        ...state,
        cart: newArr,
      };

    case actions.removeFromCart:
      newArr = state.cart.filter((item) => {
        return item.id !== action.payload.id;
      });
      return {
        ...state,
        cart: newArr,
      };
    case actions.clearCart:
      newArr = [];
      return {
        ...state,
        cart: newArr,
      };
    case actions.getOrderHistory + pending:
      return {
        ...state,
        loading: {
          ...state.loading,
          lastOrder: true,
        },
        msg: 'loading',
      };
    case actions.getOrderHistory + fulfilled:
      return {
        ...state,
        loading: {
          ...state.loading,
          lastOrder: false,
        },
        lastOrder: action.payload.data,
        msg: 'done',
      };
    case actions.getOrderHistory + rejected:
      return {
        ...state,
        loading: {
          ...state.loading,
          lastOrder: false,
        },
        error: true,
        msg: action.payload.error,
      };
    case actions.addOrder + pending:
      return {
        ...state,
        loading: {...state.loading, addOrder: true},
        msg: 'making order to the cafe...',
      };
    case actions.addOrder + fulfilled:
      return {
        ...state,
        loading: {...state.loading, addOrder: false},
        msg: 'Make order was successful',
      };
    case actions.addOrder + rejected:
      return {
        ...state,
        loading: {...state.loading, addOrder: false},
        msg: 'unable to make order',
      };
    default:
      return state;
  }
};

export default menuReducer;
