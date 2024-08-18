import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import { useSelector } from "react-redux";
import { useProductListData } from "../redux/hooks";

const InvoiceItem = (props) => {
  const { onItemizedItemEdit, currency, onRowDel, items, onRowAdd } = props;

  const { productList } = useProductListData();  
  const itemTable = items.map((item) => (
    <ItemRow
      key={item.id}
      productList={productList}
      item={item}
      onDelEvent={onRowDel}
      onItemizedItemEdit={onItemizedItemEdit}
      currency={currency}
    />
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = (props) => {
  const { productList, item, onItemizedItemEdit, currency } = props;

  console.log("---productlsit",productList)
  const onProductSelect = (event) => {
    const selectedProduct = productList.find(
      (product) => product._id === event.target.value
    );

    if (selectedProduct) {
      onItemizedItemEdit(
        { target: { name: "itemName", value: selectedProduct.title } },
        item.itemId
      );
      onItemizedItemEdit(
        { target: { name: "itemPrice", value: selectedProduct.price } },
        item.itemId
      );
    }
  };

  const onDelEvent = () => {
    props.onDelEvent(item);
  };

  return (
    <tr>
      <td style={{ width: "100%" }}>
        <select
          className="form-select"
          value={item.itemName}
          onChange={onProductSelect}
        >
          <option value="">Select a product</option>
          {productList.map((product) => (
            <option key={product._id} value={product._id}>
              {product.title}
            </option>
          ))}
        </select>
        <EditableField
          onItemizedItemEdit={(evt) => onItemizedItemEdit(evt, item.itemId)}
          cellData={{
            type: "text",
            name: "itemDescription",
            placeholder: "Item description",
            value: item.itemDescription,
            id: item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={(evt) => onItemizedItemEdit(evt, item.itemId)}
          cellData={{
            type: "number",
            name: "itemQuantity",
            min: 1,
            step: "1",
            value: item.itemQuantity,
            id: item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={(evt) => onItemizedItemEdit(evt, item.itemId)}
          cellData={{
            leading: currency,
            type: "number",
            name: "itemPrice",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: item.itemPrice,
            id: item.itemId,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};
export default InvoiceItem;
