import { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = ({ category, setEditingCategory }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (category) {
        await axios.put(`http://localhost:8080/api/categories/${category.id}`, { name }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:8080/api/categories', { name }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <div className="category-form">
      <h2>{category ? 'Edit Category' : 'Add Category'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">{category ? 'Update' : 'Add'}</button>
        <button type="button" onClick={() => setEditingCategory(null)}>Cancel</button>
      </form>
    </div>
  );
};

export default CategoryForm;
