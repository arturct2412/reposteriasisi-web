import { useState } from "react";
import { Link } from "react-router-dom";

// PRODUCTOS 
const SHOWCASE_PRODUCTS = [
    { id: 1, name: "Cinnabons", price: 60, description: "Disfruta de 6 Cinnabons recién horneados, suaves y aromáticos, en dos sabores irresistibles: Miel de Canela, con su toque cálido y dulce, y Glaseado, cubierto con una capa cremosa y brillante.", img: "/img/cinabons.jpeg" },
    { id: 2, name: "Cupcakes Artesanales", price: 30, description: "Media docena de cupcakes con Chantylly suave. Sabores: oreo, zanahoria y chocolate.", img: "/img/cupcake.jpeg" },
    { id: 3, name: "Alfajores Cubanos", price: 20, description: "Media docena de alfajores rellenos con dulce de leche repostero y bañados en azucar molida.", img: "/img/alfajores.jpeg" },
    {
        id: 4, name: "Torta Decorada", price: 190, description: "Torta decorada con crema disponible en  tamaños 8 o para 20 personas entre dos deliciosos sabores: Oreo o Zanahoria, un clásico bizcocho  y nuestra crema especial.",
        images: [
            "/img/torta oreo.jpeg",
            "/img/torta zana.jpeg"
        ]
    },
];

// TITULOS
const SectionTitle = ({ title }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-3">{title}</h2>

        <div className="w-16 h-1 bg-black mx-auto rounded-full"></div>
    </div>
);



export default function Home() {
    const [showSchedule, setShowSchedule] = useState(false);
    const [activeImages, setActiveImages] = useState({});

    const toggleImage = (id, totalImages) => {
        setActiveImages(prev => {
            const currentIndex = prev[id] || 0;
            const nextIndex = (currentIndex + 1) % totalImages;
            return { ...prev, [id]: nextIndex };
        });
    };

    return (
        <div className="min-h-screen bg-[url('/img/fondo.jpeg')] bg-cover bg-fixed bg-center relative">
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm pointer-events-none"></div>
            <div className="relative z-10 text-black">
                {/* HEADER */}
                <header className="relative min-h-[65vh] flex items-center justify-center px-4 md:px-10 bg-[url('/img/head.jpeg')] bg-cover bg-center bg-no-repeat">
                    <div className="absolute inset-0 bg-white/25 backdrop-blur-[2px]"></div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8 py-10">
                        {/*LOGO  */}
                        <div className="flex justify-center md:justify-start">
                            <img
                                src="/img/logo.jpeg"
                                alt="Logo Repostería Sissi"
                                className="w-56 h-56 md:w-80 md:h-80 object-contain"
                            />
                        </div>

                        {/* TEXTO Y BOTONES */}
                        <div className="flex flex-col items-center text-center gap-6">
                            <h1
                                className="text-5xl md:text-7xl lg:text-8xl text-black leading-tight"
                                style={{ fontFamily: "'Parisienne', cursive" }}
                            >
                                Repostería Sissi
                            </h1>

                            <p className="text-xl md:text-2xl font-medium text-black/90 max-w-xl">
                                Reposteria artesanal, fresco y hecho con amor.
                            </p>

                        </div>
                        <div className="hidden md:block"></div>

                    </div>
                </header>

                {/* INFORMACIÓN */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <SectionTitle title="Sobre Nosotros" />
                        <p className="text-black/90 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
                            En <strong className="text-pink-600">Repostería Sissi</strong> cada postre está elaborado con ingredientes de primera calidad y recetas depuradas.
                            Trabajamos por encargo para garantizar frescura, sabor y una presentación cuidada al detalle.
                        </p>
                        <div className="flex justify-center gap-8 text-sm font-medium text-black/80 flex-wrap">
                            <span>🌿 Ingredientes frescos</span>
                            <span>🎨 Diseños personalizados</span>
                            <span>⏱️ Entrega puntual</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto justify-center">
                        <button onClick={() => setShowSchedule(true)} className="bg-transparent text-black px-10 py-3.5 rounded-full font-bold border-2 border-black hover:bg-black hover:text-white transition text-lg min-w-[180px]">
                            Ver Horarios
                        </button>
                    </div>
                    <div className="w-20 h-0.5 bg-black/20 mx-auto mt-16"></div>
                </section>

                {/* PRODUCTOS */}
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <SectionTitle title="Nuestros Productos" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {SHOWCASE_PRODUCTS.map((product) => {
                                // ✅ Compatibilidad: acepta images[] o img (formato viejo)
                                const imgs = Array.isArray(product.images)
                                    ? product.images
                                    : [product.img || "/img/placeholder.jpg"];

                                const idx = activeImages[product.id] || 0;
                                const currentImg = imgs[Math.min(idx, imgs.length - 1)];

                                return (
                                    <div key={product.id} className="bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-black/20">
                                        <div
                                            className="relative overflow-hidden h-52 cursor-pointer select-none"
                                            onClick={() => toggleImage(product.id, imgs.length)}
                                        >
                                            <img
                                                src={currentImg}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {imgs.length > 1 && (
                                                <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none">
                                                    📸 {imgs.length} fotos
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg text-black leading-tight">{product.name}</h3>
                                                <span className="bg-black/90 text-white text-sm font-semibold px-2.5 py-1 rounded-full">
                                                    Bs. {product.price.toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-black/80 text-sm leading-relaxed mt-1">{product.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="text-center mt-12">
                            <Link
                                to="/catalogo"
                                className="inline-flex items-center gap-2 bg-black/90 text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black border border-black transition shadow-md"
                            >
                                Ir al catálogo completo para pedir →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* UBICACIÓN */}
                <section className="py-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        <SectionTitle title="Zona de Cobertura" />
                        {/* Contenedor con fondo blanco, borde negro */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border-2 border-black">
                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-xl text-black mb-3">Retiros y Entregas</h3>
                                    <p className="text-black/80 mb-4 leading-relaxed">
                                        Operamos desde <strong className="text-pink-600">Zona final America Oeste</strong> y alrededores.
                                        Coordinamos entrega directamente por WhatsApp.
                                    </p>
                                    <ul className="space-y-2 text-sm text-black font-medium">
                                        <li className="flex items-start gap-2">✅ Entregas coordinadas con horario previo</li>
                                        <li className="flex items-start gap-2">✅ Envíos a domicilio por Yango con costo adicional</li>
                                    </ul>
                                </div>
                                {/* Mapa con borde negro */}
                                <div className="w-full md:w-1/2 h-56 md:h-64 rounded-xl overflow-hidden shadow-inner border-2 border-black bg-slate-200">
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
                    </div>
                </section>
                {/* HORARIOS */}
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
                {/* BOTÓN WHATSAPP */}
                <a
                    href="https://wa.me/59173038764?text=Hola!%20Quisiera%20hacer%20una%20consulta."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
                    aria-label="Chat en WhatsApp"
                >
                    {/* MENSAJE */}
                    <span className="absolute right-full mr-3 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                        Pedidos/dudas Escríbenos
                    </span>
                    {/* Icono */}
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
                {/* FOOTER */}
                <footer className="bg-black text-white py-10 px-4 text-center mt-10 border-t-2 border-pink-500">
                    <p className="font-semibold mb-1">Repostería Sisi</p>
                    <p className="text-sm text-slate-300">Reposteria con alma artesanal 🍰</p>
                    <div className="mt-4 text-xs text-slate-500">
                        © {new Date().getFullYear()} Todos los derechos reservados.
                    </div>
                </footer>
            </div>
        </div>
    );
}