import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useProductListData } from "../redux/hooks";
import { InvoiceRow } from './InvoiceList';
import ProductRow from '../components/ProductRow';

function Products() {
  const { productList } = useProductListData();  
  const navigate = useNavigate();
  const isListEmpty = Array.isArray(productList) && productList.length === 0; 

console.log("-----product list",productList)
  return (
    <>
      {isListEmpty ? (
        <div className="d-flex flex-column align-items-center gap-2">
          <h3 className="fw-bold pb-2 pb-md-4">No products present</h3>
          <Link to="/addProduct">
            <Button variant="primary">Add Product</Button>
          </Link>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-start min-vh-100 pt-5">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <h3 className="fw-bold pb-2 pb-md-4">Products List</h3>
            <Link to="/addProduct">
              <Button variant="primary mb-2 mb-md-4">Create Product</Button>
            </Link>
            <Link to="/">
              <Button variant="primary mb-2 mb-md-4">Go to Invoice</Button>
            </Link>
            <div className="d-flex gap-2">
              {/* Add functionality for Copying if needed */}
              <Button variant="dark mb-2 mb-md-4">
                Copy Product
              </Button>
              <input
                type="text"
                placeholder="Enter Product ID to copy"
                className="bg-white border"
                style={{ height: "50px" }}
              />
            </div>
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>Product No.</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                {/* Add more columns if needed */}
              </tr>
            </thead>
            <tbody>
              {productList.length>0&&productList.map((product) => (
                <ProductRow
                  key={product?.id||0}
                  product={product}
                 
                />
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  )
}

export default Products;
