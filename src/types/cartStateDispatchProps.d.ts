type CartDispatchProps = {
  type: "ADD" | "DELETE" | "CLEAR" | "SET_COUNT";
  id?: number;
  count?: number;
};

export default CartDispatchProps;
