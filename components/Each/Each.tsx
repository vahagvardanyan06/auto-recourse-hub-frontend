import { Children } from "react";

const Each = ({ render, of }: any) =>
  Children.toArray(of?.map((item: any, index: any) => render(item, index)));
export default Each;
