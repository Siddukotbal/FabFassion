
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import EditProduct from './EditProduct';
import './productlist.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product.id !== id));

      alert("product deleted successfully!")
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  const handleAddButtonClick = () => {
    setShowAddForm(!showAddForm);
    setEditingProduct(null); // Close edit form if open
  };

  // Function to handle the immediate update of the product list state
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null); // Close the edit form after updating
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <button onClick={handleAddButtonClick}>
        {showAddForm ? 'Cancel' : 'Add Product'}
      </button>
      {showAddForm && <ProductForm setEditingProduct={setEditingProduct} />}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          setEditingProduct={setEditingProduct}
          handleUpdateProduct={handleUpdateProduct} // Pass the update handler
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Old Price</th>
            <th>New Price</th>
            <th>Stock Quantity</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{'\u20B9'}{product.old_price}</td>
              <td>{'\u20B9'}{product.new_price}</td>
              <td>{product.stockQuantity}</td>
              <td>{product.category ? product.category.name : ''}</td>
              <td>
                {product.image ? (
                  <img
                    src={`http://localhost:8080/uploaded/${product.image}`}
                    alt={product.name}
                    style={{ width: '100px' }}
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
