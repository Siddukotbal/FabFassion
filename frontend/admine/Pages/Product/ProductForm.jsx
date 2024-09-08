// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './product.css';

// const ProductForm = ({ setEditingProduct }) => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [oldPrice, setOldPrice] = useState('');
//   const [newPrice, setNewPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [stockQuantity, setStockQuantity] = useState(''); // Add stockQuantity state
//   const [file, setFile] = useState(null);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('description', description);
//     formData.append('old_price', oldPrice);
//     formData.append('new_price', newPrice);
//     formData.append('stockQuantity', stockQuantity); // Add stockQuantity field
//     formData.append('category', category);
//     if (file) formData.append('file', file);

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:8080/api/products', formData, {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setEditingProduct(null); // Close the form after submission
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
//   };

//   return (
//     <div className="product-form">
//       <h2>Add Product</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </label>
//         <label>
//           Description:
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
//         </label>
//         <label>
//           Old Price:
//           <input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
//         </label>
//         <label>
//           New Price:
//           <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
//         </label>
//         <label>
//           Stock Quantity:
//           <input type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />
//         </label>
//         <label>
//           Category:
//           <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
//         </label>
//         <label>
//           Image:
//           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//         </label>
//         <button type="submit">Add</button>
//         <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;

import { useState } from 'react';
import axios from 'axios';
import './product.css';

const ProductForm = ({ setEditingProduct, refreshProductList }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('old_price', oldPrice);
    formData.append('new_price', newPrice);
    formData.append('stockQuantity', stockQuantity);
    formData.append('category', category);
    if (file) formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/products', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      
      alert('Product successfully added'); // Show alert message
      refreshProductList(); // Update the product list
      setEditingProduct(null); // Close the form after submission
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Old Price:
          <input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
        </label>
        <label>
          New Price:
          <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
        </label>
        <label>
          Stock Quantity:
          <input type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />
        </label>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Image:
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        <button type="submit">Add</button>
        <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
      </form>
    </div>
  );
};

export default ProductForm;

