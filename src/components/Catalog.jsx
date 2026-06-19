import { useState } from "react";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "59173038764";

// PRODUCTOS 
const SHOWCASE_PRODUCTS = [
  {
    id: 1,
    name: "Cinnabons",
    price: 54,
    unit: "Media docena",
    description: "Disfruta de 6 Cinnabons recién horneados, suaves y aromáticos.",
    images: ["/img/cinabons.jpeg"],
    options: [
      { label: "Clásico Miel", value: "miel", price: 54 },
      { label: "Glaseado", value: "glaseado", price: 60 },
      { label: "Mixto", value: "mixto", price: 57 }
    ]
  },
  {
    id: 2,
    name: "Cupcakes Artesanales",
    price: 30,
    unit: "Media docena",
    description: "Media docena de cupcakes con Chantylly suave.",
    images: ["/img/cupcake.jpeg"],
    options: [
      { label: "Oreo", value: "oreo" },
      { label: "Zanahoria", value: "zanahoria" },
      { label: "Chocolate", value: "chocolate" }
    ]
  },
  {
    id: 3,
    name: "Alfajores Cubanos",
    price: 20,
    unit: "Media docena",
    description: "Media docena de alfajores rellenos con dulce de leche.",
    images: ["/img/alfajores.jpeg"]
  },
  {
    id: 4,
    name: "Torta Decorada",
    price: 110,
    description: "Torta decorada disponible en tamaños 8 o 20 personas. Sabores: Oreo o Zanahoria.",
    images: ["/img/torta oreo.jpeg", "/img/torta zana.jpeg"],
    sizes: [
      { label: "8 Porciones", value: "8p", price: 110 },
      { label: "20 Porciones", value: "20p", price: 190 }
    ],
    flavors: [
      { label: "Zanahoria", value: "zanahoria" },
      { label: "Oreo", value: "oreo" }
    ]
  },
];

export default function Catalog() {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [extras, setExtras] = useState("");
  const [activeImages, setActiveImages] = useState({});

  // Estados para la Torta (Tamaño y Sabor)
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // Para Cinnabons/Cupcakes

  const addToCart = () => {
    if (!selected) return;

    //  VALIDACIÓN
    if (selected.sizes && !selectedSize) return alert("⚠️ Por favor selecciona un tamaño.");
    if (selected.flavors && !selectedFlavor) return alert("️ Por favor selecciona un sabor.");
    if (selected.options && !selectedOption) return alert("⚠️ Por favor selecciona una opción (sabor).");

    const q = Math.max(1, qty);

    // 1. CALCULAR PRECIO
    let finalPrice = selected.price;
    const sizeObj = selected.sizes?.find(s => s.value === selectedSize);
    const optionObj = selected.options?.find(o => o.value === selectedOption);

    if (sizeObj) finalPrice = sizeObj.price; // Prioridad al tamaño (Torta)
    else if (optionObj?.price) finalPrice = optionObj.price; // Luego a opciones con precio (Cinnabons)

    // 2. COMPILAR NOTAS
    const notes = [];
    if (sizeObj) notes.push(`Tamaño: ${sizeObj.label}`);
    if (selected.flavors && selectedFlavor) {
      const flavorObj = selected.flavors.find(f => f.value === selectedFlavor);
      if (flavorObj) notes.push(`Sabor: ${flavorObj.label}`);
    }
    if (optionObj) notes.push(`Sabor: ${optionObj.label}`);
    if (extras.trim()) notes.push(extras.trim());

    const finalNote = notes.join(" | ");

    // 3. AGREGAR AL CARRITO
    setCart((prev) => {
      const exist = prev.find((i) => i.id === selected.id);
      if (exist) {
        return prev.map((i) => i.id === selected.id ? { ...i, qty: i.qty + q, extras: finalNote, price: finalPrice } : i);
      }
      return [...prev, { ...selected, qty: q, extras: finalNote, price: finalPrice }];
    });

    // Reset
    setSelected(null); setQty(1); setExtras("");
    setSelectedSize(""); setSelectedFlavor(""); setSelectedOption("");
  };

  const sendToWhatsApp = () => {
    if (cart.length === 0) return alert("El carrito está vacío");
    const lines = cart.map(i => {
      const unitText = i.unit ? ` (${i.unit})` : "";
      return `• ${i.name}${unitText} x${i.qty} ${i.extras ? `[${i.extras}]` : ""} - Bs. ${(i.price * i.qty).toLocaleString()}`;
    }).join("\n");
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const msg = `*Nuevo Pedido*\n\n${lines}\n\n💰 *Total: Bs. ${total.toLocaleString()}*\n\n✅ Por favor confirmar.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const toggleImage = (id, totalImages) => {
    if (totalImages <= 1) return;
    setActiveImages(prev => {
      const currentIndex = prev[id] || 0;
      return { ...prev, [id]: (currentIndex + 1) % totalImages };
    });
  };

  // 🗑️ Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };
  // 🗑️ Vaciar todo el carrito
  const clearCart = () => {
    if (window.confirm("¿Seguro que quieres vaciar el pedido?")) {
      setCart([]);
    }
  };
  return (
    <div className="min-h-screen bg-[url('/img/fondo.jpeg')] bg-cover bg-fixed bg-center relative text-black">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm pointer-events-none"></div>
      <div className="relative z-10">

        <header className="bg-[url('/img/head.jpeg')] backdrop-blur-md shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-40 border-b border-black/20">
          <Link to="/" className="text-black font-semibold hover:underline">← Volver</Link>
          <h1 className="text-lg font-bold">Catálogo</h1>
          <div className="w-16"></div>
        </header>

        <main className={`max-w-6xl mx-auto px-4 py-8 ${cart.length > 0 ? 'pb-80 sm:pb-8' : ''}`}>
          <h2 className="text-3xl font-bold text-center mb-8">Selecciona tus productos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOWCASE_PRODUCTS.map((product) => {
              const imgs = Array.isArray(product.images) ? product.images : [product.img || "/img/placeholder.jpg"];
              const idx = activeImages[product.id] || 0;
              const currentImg = imgs[Math.min(idx, imgs.length - 1)];

              return (
                <div key={product.id} className="bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-black/20">
                  <div className="relative overflow-hidden h-52 cursor-pointer select-none" onClick={() => toggleImage(product.id, imgs.length)}>
                    <img src={currentImg} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {imgs.length > 1 && <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">📸 {imgs.length} fotos</span>}
                    <span className="absolute top-3 right-3 bg-black/90 text-white text-sm font-bold px-3 py-1 rounded-full">Bs. {product.price.toLocaleString()}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                    <button onClick={() => { setSelected(product); setQty(1); setExtras(""); }} className="w-full bg-black text-white font-semibold py-2.5 rounded-xl border-2 border-black hover:bg-white hover:text-black transition">Agregar al pedido</button>
                  </div>
                </div>
              );
            })}
          </div>

          {cart.length > 0 && (
            <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-4 sm:p-5 z-50 border-2 border-black">
              <h3 className="font-bold text-lg mb-3"> Tu Pedido</h3>
              <ul className="text-sm space-y-2 max-h-40 overflow-y-auto mb-4 pr-1">
                {cart.map((i, idx) => (
                  <li key={idx} className="flex justify-between items-start gap-2 border-b border-black/20 pb-2 last:border-0 text-black">
                    <div className="flex-1">
                      <span className="font-medium">{i.name}{i.unit && <span className="text-xs text-black/60"> ({i.unit})</span>} x{i.qty}</span>
                      {i.extras && <p className="text-xs text-black/60 italic">[{i.extras}]</p>}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-semibold">Bs. {(i.price * i.qty).toLocaleString()}</span>
                      {/* 🗑️ BOTÓN ELIMINAR */}
                      <button
                        onClick={() => removeFromCart(i.id)}
                        className="text-xs text-red-600 hover:text-red-800 hover:underline font-medium transition"
                        title="Eliminar del pedido"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={clearCart}
                className="w-full mb-2 text-sm text-red-600 hover:text-red-800 font-medium py-1 hover:underline transition"
              >
                🗑️ Vaciar pedido
              </button>
              <button onClick={sendToWhatsApp} className="w-full bg-black text-white py-3 rounded-xl font-bold border-2 border-black hover:bg-white hover:text-black transition">📲 Pedir por WhatsApp</button>
            </div>
          )}
        </main>

        {/* MODAL DE PEDIDO */}
        {selected && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border-2 border-black">
              <h3 className="text-xl font-bold mb-1">{selected.name}</h3>

              {/* Lógica de Precio Dinámico */}
              {(() => {
                let displayPrice = selected.price;
                const s = selected.sizes?.find(x => x.value === selectedSize);
                const o = selected.options?.find(x => x.value === selectedOption);
                if (s) displayPrice = s.price;
                else if (o?.price) displayPrice = o.price;
                return <p className="text-black font-semibold mb-4">Bs. {displayPrice.toLocaleString()}</p>;
              })()}

              <label className="block text-sm font-medium mb-1">
                Cantidad{selected.unit ? ` (${selected.unit})` : ""}:
              </label>
              <input type="number" min="1" value={qty} onChange={e => setQty(+e.target.value)} className="w-full border-2 border-black rounded px-3 py-2 mb-3 bg-white/50" />

              {/* SELECTOR DE TAMAÑO (TORTA) */}
              {selected.sizes && (
                <>
                  <label className="block text-sm font-medium mb-1">Tamaño:</label>
                  <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)} className="w-full border-2 border-black rounded px-3 py-2 mb-3 bg-white/50" required>
                    <option value="">Selecciona tamaño</option>
                    {selected.sizes.map(s => <option key={s.value} value={s.value}>{s.label} - Bs. {s.price}</option>)}
                  </select>
                </>
              )}

              {/* SELECTOR DE SABOR (TORTA) */}
              {selected.flavors && (
                <>
                  <label className="block text-sm font-medium mb-1">Sabor:</label>
                  <select value={selectedFlavor} onChange={e => setSelectedFlavor(e.target.value)} className="w-full border-2 border-black rounded px-3 py-2 mb-3 bg-white/50" required>
                    <option value="">Selecciona sabor</option>
                    {selected.flavors.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                  </select>
                </>
              )}

              {/* SELECTOR DE OPCIONES (CINNABONS/CUPCAKES) */}
              {selected.options && (
                <>
                  <label className="block text-sm font-medium mb-1">Opción:</label>
                  <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)} className="w-full border-2 border-black rounded px-3 py-2 mb-3 bg-white/50" required>
                    <option value="">Selecciona Sabor</option>
                    {selected.options.map(o => <option key={o.value} value={o.value}>{o.label} {o.price ? `- Bs. ${o.price}` : ''}</option>)}
                  </select>
                </>
              )}

              <label className="block text-sm font-medium mb-1">Notas adicionales:</label>
              <input type="text" placeholder="Ej: sin nuez, entrega mañana..." value={extras} onChange={e => setExtras(e.target.value)} className="w-full border-2 border-black rounded px-3 py-2 mb-4 bg-white/50" />

              <div className="flex gap-3">
                <button onClick={() => setSelected(null)} className="flex-1 py-2 rounded border-2 border-black hover:bg-black/10 font-medium">Cancelar</button>
                <button onClick={addToCart} className="flex-1 py-2 rounded bg-black text-white border-2 border-black hover:bg-white hover:text-black transition font-medium">Confirmar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}