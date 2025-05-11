type ProductData = {
  id: number;
  name: string;
  price: {
    main: number;
    fractional: number;
  };
};

export default ProductData;
