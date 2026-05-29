import { useState } from "react";
import { Link } from "react-router-dom";

// 📞 CAMBIA ESTE NÚMERO (sin +, espacios ni guiones)
const WHATSAPP_NUMBER = "5491112345678";

const PRODUCTS = [
  { id: 1, name: "Torta de Chocolate", price: 15000, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
  { id: 2, name: "Cupcakes Vainilla", price: 4500, img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500&q=80" },
  { id: 3, name: "Cheesecake Frutos Rojos", price: 18000, img: "https://images.unsplash.com/photo-1567171466295-4afa63d4bb48?w=500&q=80" },
];

export default function Catalog() {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [extras, setExtras] = useState("");

  const addToCart = () => {
    if (!selected) return;
    const q = Math.max(1, qty);
    const note = extras.trim();
    setCart((prev) => {
      const exist = prev.find((i) => i.id === selected.id);
      if (exist) return prev.map((i) => i.id === selected.id ? { ...i, qty: i.qty + q, extras: note } : i);
      return [...prev, { ...selected, qty: q, extras: note }];
    });
    setSelected(null); setQty(1); setExtras("");
  };

  const sendToWhatsApp = () => {
    if (cart.length === 0) return alert("El carrito está vacío");
    const lines = cart.map(i => `• ${i.name} x${i.qty} ${i.extras ? `(Nota: ${i.extras})` : ""} - $${(i.price * i.qty).toLocaleString()}`).join("\n");
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const msg = `🛒 *Nuevo Pedido*\n\n${lines}\n\n💰 *Total: $${total.toLocaleString()}*\n\n✅ Por favor confirmar.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header simple con navegación */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-40">
        <Link to="/" className="text-indigo-600 font-semibold hover:underline flex items-center gap-1">← Volver</Link>
        <h1 className="text-lg font-bold text-slate-700">Catálogo</h1>
        <div className="w-16"></div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">🍰 Selecciona tus productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group">
              <div className="relative overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-56 object-cover group-hover:scale-105 transition" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-slate-700">${p.price.toLocaleString()}</div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-3">{p.name}</h3>
                <button onClick={() => { setSelected(p); setQty(1); setExtras(""); }} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition">Agregar al pedido</button>
              </div>
            </div>
          ))}
        </div>

        {/* Carrito flotante responsive */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 bg-white shadow-2xl rounded-2xl p-4 sm:p-5 z-50 border border-slate-200">
            <h3 className="font-bold text-lg mb-3">🛒 Tu Pedido</h3>
            <ul className="text-sm space-y-2 max-h-40 overflow-y-auto mb-4 pr-1">
              {cart.map((i, idx) => (
                <li key={idx} className="flex justify-between border-b pb-2 last:border-0">
                  <span>{i.name} x{i.qty}</span>
                  <span className="font-semibold text-green-600">${(i.price * i.qty).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <button onClick={sendToWhatsApp} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition">📲 Pedir por WhatsApp</button>
          </div>
        )}
      </main>

      {/* Modal de cantidad/notas */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold mb-1">{selected.name}</h3>
            <p className="text-green-600 font-semibold mb-4">${selected.price.toLocaleString()}</p>
            <label className="block text-sm text-slate-600 mb-1">Cantidad:</label>
            <input type="number" min="1" value={qty} onChange={e => setQty(+e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
            <label className="block text-sm text-slate-600 mb-1">Notas (opcional):</label>
            <input type="text" placeholder="Ej: sin nuez, entrega mañana..." value={extras} onChange={e => setExtras(e.target.value)} className="w-full border rounded px-3 py-2 mb-4" />
            <div className="flex gap-3">
              <button onClick={() => setSelected(null)} className="flex-1 py-2 rounded border hover:bg-slate-50">Cancelar</button>
              <button onClick={addToCart} className="flex-1 py-2 rounded bg-green-500 text-white hover:bg-green-600">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}