import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductModal = ({ showModal, closeModal, info }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {info?.id}</p>
        <p><strong>Name:</strong> {info?.productName}</p>
        <p><strong>Description:</strong> {info?.itemDescription}</p>
        <p><strong>Price:</strong> {info?.price}</p>
      
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
