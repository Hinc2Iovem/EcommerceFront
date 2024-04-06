import { ReactNode, createContext, useMemo, useReducer } from "react";
import FormatCurrency from "../../utilities/FormatCurrency";

export type CartItem = {
  id: number;
  qty: number;
  img: string;
  price: number;
  rating: { rate: number; count: number };
  description: string;
  title: string;
  category: string;
};

type CartState = {
  cart: CartItem[];
};

const initValue: CartState = {
  cart: [],
};

const REDUCER_ACTION_TYPES = {
  ADD: "ADD",
  MINUS: "MINUS",
  REMOVE: "REMOVE",
  CHECKOUT: "CHECKOUT",
  QUANTITY: "QUANTITY",
  PLUS: "PLUS",
};

export type ReducerActionTypes = typeof REDUCER_ACTION_TYPES;

export type ReducerActTypes = {
  type: string;
  payload?: CartItem;
};

const reducer = (state: CartState, action: ReducerActTypes): CartState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.ADD: {
      if (!action.payload) {
        throw new Error(`No payload was provided in ADD`);
      }
      const { id, description, img, price, rating, title, qty, category } =
        action.payload;
      const filteredItems = state.cart.filter((item) => item.id !== id);

      return {
        ...state,
        cart: [
          ...filteredItems,
          { id, description, img, price, qty, rating, title, category },
        ],
      };
    }
    case REDUCER_ACTION_TYPES.PLUS: {
      if (!action.payload) {
        throw new Error(`No payload was provided in PLUS`);
      }
      const { id } = action.payload;
      const filteredItems = state.cart.filter((item) => item.id !== id);
      const currentItem: CartItem | undefined = state.cart.find(
        (item) => item.id === id
      );
      if (!currentItem) {
        throw new Error("No such Item");
      }
      const qty = currentItem.qty + 1;
      const updatedCurrentItem = { ...currentItem, qty };

      return {
        ...state,
        cart: [...filteredItems, updatedCurrentItem],
      };
    }
    case REDUCER_ACTION_TYPES.MINUS: {
      if (!action.payload) {
        throw new Error(`No payload was provided in MINUS`);
      }
      const { id } = action.payload;
      const filteredItems = state.cart.filter((item) => item.id !== id);
      const currentItem: CartItem | undefined = state.cart.find(
        (item) => item.id === id
      );
      if (!currentItem) {
        throw new Error("No such Item");
      }
      const qty = currentItem?.qty ? currentItem.qty - 1 : 0;
      const updatedCurrentItem = { ...currentItem, qty };

      if (qty > 0) {
        return {
          ...state,
          cart: [...filteredItems, updatedCurrentItem],
        };
      }
      return {
        ...state,
        cart: [...filteredItems],
      };
    }
    case REDUCER_ACTION_TYPES.QUANTITY: {
      if (!action.payload) {
        throw new Error(`No payload was provided in QUANTITY`);
      }
      const { id, qty } = action.payload;
      const filteredItems = state.cart.filter((item) => item.id !== id);
      const currentItem: CartItem | undefined = state.cart.find(
        (item) => item.id === id
      );
      if (!currentItem) {
        throw new Error("No such Item");
      }
      const updatedCurrentItem = { ...currentItem, qty };
      return { ...state, cart: [...filteredItems, updatedCurrentItem] };
    }
    case REDUCER_ACTION_TYPES.REMOVE: {
      if (!action.payload) {
        throw new Error(`No payload was provided in REMOVE`);
      }
      const { id } = action.payload;
      const filteredItems = state.cart.filter((item) => item.id !== id);

      return {
        ...state,
        cart: [...filteredItems],
      };
    }
    case REDUCER_ACTION_TYPES.CHECKOUT: {
      return {
        ...state,
        cart: [],
      };
    }
    default: {
      throw new Error("No such action type");
    }
  }
};

const CartContextHandler = (initValue: CartState) => {
  const [state, dispatch] = useReducer(reducer, initValue);
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPES;
  }, []);

  const totalItems = state.cart.reduce((curr, next) => {
    return curr + next.qty;
  }, 0);

  const totalPrice = FormatCurrency(
    state.cart.reduce((curr, next) => {
      return curr + next.price * next.qty;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => {
    return b.qty - a.qty;
  });

  return { REDUCER_ACTIONS, totalItems, totalPrice, cart, dispatch };
};

type CartContextHandlerTypes = ReturnType<typeof CartContextHandler>;

const CartContextState: CartContextHandlerTypes = {
  cart: [],
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPES,
  totalItems: 0,
  totalPrice: "",
};

const CartContext = createContext(CartContextState);

type CartContextProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartContextProps) => {
  return (
    <CartContext.Provider value={CartContextHandler(initValue)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
