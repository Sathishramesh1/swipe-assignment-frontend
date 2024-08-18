import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiSolidPencil, BiTrash } from 'react-icons/bi';
import { BsEyeFill } from 'react-icons/bs';
import { deleteProduct } from '../redux/productSlice';
import ProductModal from './ProductModal';  

const ProductRow = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    dispatch(deleteProduct(product?.id));
  };

  const handleEditClick = () => {
    navigate(`/editProduct/${product?.id}`);
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <tr>
        <td>{product?.id}</td>
        <td className="fw-normal">{product?.productName}</td>
        <td className="fw-normal">{product?.itemDescription}</td>
        <td className="fw-normal">{product?.price}</td>
        <td style={{ width: '5%' }}>
          <Button variant="outline-primary" onClick={handleEditClick}>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <BiSolidPencil />
            </div>
          </Button>
        </td>
        <td style={{ width: '5%' }}>
          <Button variant="danger" onClick={handleDeleteClick}>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <BiTrash />
            </div>
          </Button>
        </td>
        <td style={{ width: '5%' }}>
          <Button variant="secondary" onClick={openModal}>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <BsEyeFill />
            </div>
          </Button>
        </td>
      </tr>

      <ProductModal
        showModal={isOpen}
        closeModal={closeModal}
        info={product}
      />
    </>
  );
};

export default ProductRow;
