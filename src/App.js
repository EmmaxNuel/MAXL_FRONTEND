import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const loadProducts = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (e) { setError('Failed to load products'); }
  };

  useEffect(() => { loadProducts(); }, []);

  const addProduct = async () => {
    setError(''); setMsg('');
    try {
      const res = await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: parseFloat(price), description, stock: parseInt(stock) })
      });
      const data = await res.json();
      if (res.ok) { setMsg('Product added'); loadProducts(); }
      else setError(data.error || 'Failed');
    } catch (e) { setError('Network error'); }
  };

  const createOrder = async () => {
    setError(''); setMsg('');
    try {
      const res = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: parseInt(productId), quantity: parseInt(quantity), customer_name: customerName, customer_email: customerEmail })
      });
      const data = await res.json();
      if (res.ok) { setMsg('Order created'); loadProducts(); }
      else setError(data.error || 'Failed');
    } catch (e) { setError('Network error'); }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h1>E-Commerce Store</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <h2>Products</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '6px' }} />
            <input placeholder="Price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} style={{ padding: '6px' }} />
            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '6px' }} />
            <input placeholder="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} style={{ padding: '6px' }} />
            <button onClick={addProduct} style={{ padding: '8px', background: '#238636', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Product</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {products.map(p => (
              <li key={p.id} style={{ padding: '8px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <span>{p.name} — ₦{p.price} <small>(Stock: {p.stock})</small></span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Place Order</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
            <input placeholder="Product ID" type="number" value={productId} onChange={(e) => setProductId(e.target.value)} style={{ padding: '6px' }} />
            <input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ padding: '6px' }} />
            <input placeholder="Your Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={{ padding: '6px' }} />
            <input placeholder="Your Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} style={{ padding: '6px' }} />
            <button onClick={createOrder} style={{ padding: '8px', background: '#0f3460', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Place Order</button>
          </div>
          {msg && <p style={{ color: 'green' }}>{msg}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
