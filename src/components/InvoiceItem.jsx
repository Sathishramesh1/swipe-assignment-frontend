import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import { useSelector } from "react-redux";
import { useProductListData } from "../redux/hooks";

const InvoiceItem = (props) => {
  const { onItemizedItemEdit, currency, onRowDel, items, onRowAdd,editField } = props;

  const { productList } = useProductListData();  
  console.log("product lis",productList)
  const itemTable = items.map((item) => (
    <ItemRow
      key={item.id}
      productList={productList}
      item={item}
      onDelEvent={onRowDel}
      onItemizedItemEdit={onItemizedItemEdit}
      currency={currency}
      editField={editField}
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
  const { productList, item, onItemizedItemEdit, currency,editField } = props;

  console.log("---productlsit",productList);

  const onProductSelect = (event) => {
    const selectedProduct = productList.find(
      (product) => product.id === event.target.value
    );

    if (selectedProduct) {
      onItemizedItemEdit(
        { target: 
          { 
            // name: "itemName",
            itemName:selectedProduct.title,
            itemPrice:selectedProduct.price,
            value: selectedProduct.title } },
        item.itemId
      );
     
      
    }else {
      // If no product is selected or invalid ID
      onItemizedItemEdit(
        { target: { name: "itemName", value: "" } },
        item.itemId
      );
      onItemizedItemEdit(
        { target: { name: "itemPrice", value: "" } },
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
          value={item.itemId}
          onChange={onProductSelect}
          style={{ color:"black" }}
        >
          <option value="">Select a product</option>
          {productList.map((product) => (
            <option key={product.itemId} value={product.itemId} style={{color:"black"}}>
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
