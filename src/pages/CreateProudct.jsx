import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../redux/productSlice';  
import { Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { updateInvoiceItems } from '../redux/invoicesSlice';

const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const navigate = useNavigate();
 
  const existingProduct = useSelector(state =>
    state.products.find(product => product.id === Number(id))
  );

  useEffect(() => {
    if (existingProduct) {
      // Populate form with existing product data when editing
      setProductName(existingProduct.productName);
      setItemDescription(existingProduct.itemDescription);
      setPrice(existingProduct.price);
    }
  }, [existingProduct]);

  const handleSaveProduct = () => {
    console.log("Exist",existingProduct)
    const productData = {
      id: id ? existingProduct.id : Date.now(),  
      productName,
      itemDescription,
      price,
    };

    if (id) {
      // Update the product if editing
      dispatch(updateProduct(productData));
      dispatch(updateInvoiceItems(productData))
    } else {
      // Add a new product if creating
      dispatch(addProduct(productData));
    }

    // Clear the form fields
    setProductName('');
    setItemDescription('');
    setPrice('');
    
   
    navigate('/products');
  };

  return (
    <div className="d-flex flex-column min-vh-100 pt-5">
      <h3 className="fw-bold pb-2">{id ? "Edit Product" : "Create New Product"}</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Item Description</Form.Label>
          <Form.Control
            type="text"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Enter item description"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSaveProduct}>
          {id ? "Update Product" : "Create Product"}
        </Button>
      </Form>
    </div>
  );
};

export default CreateProduct;
