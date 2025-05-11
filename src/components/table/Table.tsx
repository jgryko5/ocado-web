import "./styles.css";
import { Children, type FC, type ReactNode } from "react";

const Table: FC<{ columns: string[]; children?: ReactNode }> = (props) => {
  return (
    <table id="productTable">
      <thead>
        <tr>
          {props.columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Children.count(props.children) === 0 && (
          <tr>
            <td colSpan={props.columns.length}>Brak elementów!</td>
          </tr>
        )}
        {props.children}
      </tbody>
    </table>
  );
};

export default Table;
