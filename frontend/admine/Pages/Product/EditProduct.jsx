// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './product.css';

// const EditProduct = ({ product, setEditingProduct }) => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [oldPrice, setOldPrice] = useState('');
//   const [newPrice, setNewPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [stockQuantity, setStockQuantity] = useState('');
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     if (product) {
//       console.log('Product for editing:', product); // Logging for debugging
//       setName(product.name);
//       setDescription(product.description);
//       setOldPrice(product.old_price);
//       setNewPrice(product.new_price);
//       setStockQuantity(product.stockQuantity);
//       setCategory(product.category ? product.category.id : '');
//     }
//   }, [product]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!product || !product.id) {
//       console.error('Product ID is missing');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('description', description);
//     formData.append('old_price', oldPrice);
//     formData.append('new_price', newPrice);
//     formData.append('stockQuantity', stockQuantity);
//     formData.append('category', category);
//     if (file) formData.append('file', file);

//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`http://localhost:8080/api/products/${product.id}`, formData, {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setEditingProduct(null);
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
//   };

//   return (
//     <div className="product-form">
//       <h2>Edit Product</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </label>
//         <label>
//           Description:
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </label>
//         <label>
//           Old Price:
//           <input
//             type="number"
//             value={oldPrice}
//             onChange={(e) => setOldPrice(e.target.value)}
//           />
//         </label>
//         <label>
//           New Price:
//           <input
//             type="number"
//             value={newPrice}
//             onChange={(e) => setNewPrice(e.target.value)}
//           />
//         </label>
//         <label>
//           Stock Quantity:
//           <input
//             type="number"
//             value={stockQuantity}
//             onChange={(e) => setStockQuantity(e.target.value)}
//           />
//         </label>
//         <label>
//           Category:
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />
//         </label>
//         <label>
//           Image:
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//         </label>
//         <button type="submit">Update</button>
//         <button
//           type="button"
//           onClick={() => setEditingProduct(null)}
//         >
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;


import { useState, useEffect } from 'react';
import axios from 'axios';
import './productlist.css';

const EditProduct = ({ product, setEditingProduct, handleUpdateProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setOldPrice(product.old_price);
      setNewPrice(product.new_price);
      setStockQuantity(product.stockQuantity);
      setCategory(product.category ? product.category.id : '');
    }
  }, [product]);

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
      const response = await axios.put(`http://localhost:8080/api/products/${product.id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      handleUpdateProduct(response.data); // Update the product in the list
      setEditingProduct(null); // Close the edit form
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="product-form">
      <h2>Edit Product</h2>
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
        <button type="submit">Update</button>
        <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProduct;
