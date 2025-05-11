import { useReducer, createContext } from "react";
import type { Dispatch, FC, ReactNode } from "react";
import type CartState from "@/types/cartstate";
import type CartDispatchProps from "@/types/cartStateDispatchProps";
import { MAX_ITEMS_IN_CART } from "@/data";

const CartStateProvider: FC<{ children: ReactNode }> = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, CartInitialState);
  return (
    <CartItemsContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatchCart}>
        {props.children}
      </CartDispatchContext.Provider>
    </CartItemsContext.Provider>
  );
};

const CartInitialState: CartState = { items: {} };
const cartReducer = (state: CartState, action: CartDispatchProps) => {
  switch (action.type) {
    case "ADD": {
      const productId = action.id;
      if (!productId) return state;
      const newItems = { ...state.items };
      if (Object.hasOwn(state.items, productId)) {
        if (newItems[productId].count < MAX_ITEMS_IN_CART)
          newItems[productId].count += 1;
      } else {
        newItems[productId] = { count: 1 };
      }
      return { ...state, items: newItems };
    }

    case "DELETE": {
      const productId = action.id;
      if (!productId || !Object.hasOwn(state.items, productId)) return state;
      const newItems = { ...state.items };
      newItems[productId].count -= 1;
      if (newItems[productId].count <= 0) delete newItems[productId];
      return { ...state, items: newItems };
    }

    case "CLEAR":
      return {
        ...state,
        items: {},
      };

    case "SET_COUNT": {
      const productId = action.id;
      if (!productId) return state;
      if (Object.hasOwn(state.items, productId)) {
        let newItems = { ...state.items };
        newItems[productId].count = action.count ?? 1;
        return { ...state, items: newItems };
      }
      return state;
    }
  }
};

export const CartItemsContext = createContext<null | CartState>(null);
export const CartDispatchContext =
  createContext<null | Dispatch<CartDispatchProps>>(null);

export default CartStateProvider;
