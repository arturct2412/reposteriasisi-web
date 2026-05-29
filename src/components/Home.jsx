import { useState } from "react";
import { Link } from "react-router-dom";

// 📦 PRODUCTOS DE MUESTRA
const SHOWCASE_PRODUCTS = [
    { id: 1, name: "Torta de Chocolate", price: 15000, description: "Bizcocho húmedo con ganache de chocolate belga y frutos rojos. Ideal para celebraciones.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
    { id: 2, name: "Cupcakes Artesanales", price: 4500, description: "Docena de cupcakes con buttercream suave. Sabores: vainilla, red velvet, limón y chocolate.", img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500&q=80" },
    { id: 3, name: "Cheesecake Clásico", price: 18000, description: "Base crocante de galleta, crema de queso premium y cobertura de frutos del bosque.", img: "https://images.unsplash.com/photo-1567171466295-4afa63d4bb48?w=500&q=80" },
    { id: 4, name: "Alfajores de Maicena", price: 3500, description: "Docena de alfajores rellenos con dulce de leche repostero y bañados en coco rallado.", img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=500&q=80" },
    { id: 5, name: "Tarta de Frutas", price: 12000, description: "Masa quebrada, crema pastelera artesanal y frutas frescas de temporada.", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&q=80" },
    { id: 6, name: "Brownies Intensos", price: 5000, description: "Porción de 6 unidades. Chocolate 70% cacao, textura húmeda y nueces crocantes.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80" },
];

// 🔹 Componente reutilizable para títulos de sección
const SectionTitle = ({ title }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">{title}</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
    </div>
);

export default function Home() {
    const [showSchedule, setShowSchedule] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* 🌈 HERO */}
            <header className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md tracking-tight">
                    Repostería Sisi
                </h1>
                <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                    Dulces artesanales, frescos y hechos con amor.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/catalogo"
                        className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        🛒 Hacer Pedido
                    </Link>
                    <button
                        onClick={() => setShowSchedule(true)}
                        className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition"
                    >
                        ℹ️ Ver Horarios
                    </button>
                </div>
            </header>

            {/* 📖 SECCIÓN 1: INFORMACIÓN */}
            <section className="bg-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <SectionTitle title="Sobre Nosotros" />
                    <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
                        En <strong className="text-indigo-600">Repostería Sisi</strong> cada postre está elaborado con ingredientes de primera calidad y recetas depuradas.
                        Trabajamos por encargo para garantizar frescura, sabor y una presentación cuidada al detalle.
                        Tu satisfacción es nuestra mejor receta.
                    </p>
                    <div className="mt-8 flex justify-center gap-8 text-sm text-slate-500">
                        <span>🌿 Ingredientes frescos</span>
                        <span>🎨 Diseños personalizados</span>
                        <span>⏱️ Entrega puntual</span>
                    </div>
                </div>
            </section>

            {/* 🍰 SECCIÓN 2: VITRINA DE PRODUCTOS */}
            <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-20 px-4 border-t border-slate-200">
                <div className="max-w-6xl mx-auto">
                    <SectionTitle title="Nuestros Productos" />
                    <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
                        Una muestra de lo que puedes pedir. Consulta disponibilidad, sabores y personaliza tu pedido directamente por WhatsApp.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SHOWCASE_PRODUCTS.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-slate-100">
                                <div className="relative overflow-hidden h-52">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-slate-800 leading-tight">{product.name}</h3>
                                        <span className="bg-indigo-50 text-indigo-600 text-sm font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                                            ${product.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mt-1">{product.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/catalogo"
                            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Ir al catálogo completo para pedir →
                        </Link>
                    </div>
                </div>
            </section>

            {/* 📍 SECCIÓN 3: ZONA DE COBERTURA */}
            <section className="bg-white py-20 px-4 border-t border-slate-200">
                <div className="max-w-5xl mx-auto">
                    <SectionTitle title="Zona de Cobertura" />
                    <div className="bg-slate-50 rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex-1">
                                <h3 className="font-semibold text-xl text-slate-800 mb-3">Retiros y Entregas</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Operamos desde <strong className="text-indigo-600">Zona final America Oeste</strong> y alrededores.
                                    Coordinamos el punto de encuentro o entrega directamente por WhatsApp.
                                </p>
                                <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">✅ Entregas coordinadas con horario previo</li>
                                    <li className="flex items-start gap-2">✅ Envíos a domicilio por Yango con costo adicional</li>
                                </ul>
                            </div>
                            <div className="w-full md:w-1/2 h-56 md:h-64 rounded-xl overflow-hidden shadow-inner bg-slate-200">
                                <iframe
                                    width="100%" height="100%" frameBorder="0" scrolling="no"
                                    marginHeight="0" marginWidth="0"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12604.26471876466!2d-66.19649541104826!3d-17.36947480946246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e375000f92dbed%3A0x66aa0f5c6d03a00b!2sRotonda%20Final%20Am%C3%A9rica%20Oeste!5e0!3m2!1ses!2sbo!4v1780014371301!5m2!1ses!2sbo"
                                    allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                    title="Zona de cobertura"
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 text-center italic">
                        * La ubicación exacta se comparte únicamente al confirmar el pedido por WhatsApp.
                    </p>
                </div>
            </section>

            {/* ⏰ MODAL DE HORARIOS */}
            {showSchedule && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={() => setShowSchedule(false)}
                >
                    <div
                        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative border border-slate-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowSchedule(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl leading-none transition"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-bold mb-4 text-center text-slate-800">🕒 Horarios de Atención</h3>
                        <div className="space-y-4 text-slate-700">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                <span className="font-medium">Lunes a Viernes</span>
                                <span className="font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm">9:00 AM - 10:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Sábados</span>
                                <span className="font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm">9:00 AM - 2:00 PM</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 mt-5 text-center bg-slate-50 py-2 rounded-lg">Domingos cerrado</p>
                    </div>
                </div>
            )}
            {/* 💬 BOTÓN FLOTANTE DE WHATSAPP */}
            <a
                href="https://wa.me/59173038764?text=Hola!%20Quisiera%20hacer%20una%20consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
                aria-label="Chat en WhatsApp"
            >
                {/* Tooltip centrado arriba */}
                <span className="absolute right-full mr-3 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                    Pedidos/dudas Escríbenos
                </span>
                {/* Icono SVG */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="drop-shadow-sm"
                >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
            </a>
            {/* 🦶 FOOTER */}
            <footer className="bg-slate-900 text-slate-300 py-10 px-4 text-center">
                <p className="font-semibold text-white mb-1">Repostería Sisi</p>
                <p className="text-sm opacity-80">Dulces con alma artesanal 🍰</p>
                <div className="mt-4 text-xs opacity-50">
                    © {new Date().getFullYear()} Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
}