import { useState } from "react"
import imagenBlog1 from "../assets/blog1.png"
import imagenBlog2 from "../assets/blog2.png"
import imagenBlog3 from "../assets/blog3.png"
import imagenBlog4 from "../assets/blog4.png"

function Blog() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [hoveredBlog, setHoveredBlog] = useState(null)

    const blogs = [
        {
            id: 1,
            image: imagenBlog1,
            title: "Descubre los Mejores Lugares",
            description: "Explora destinos únicos y experiencias inolvidables"
        },
        {
            id: 2,
            image: imagenBlog2,
            title: "Aventuras Gastronómicas",
            description: "Descubre la mejor comida local y sabores tradicionales"
        },
        {
            id: 3,
            image: imagenBlog3,
            title: "Relax y Bienestar",
            description: "Encuentra tu paz en los mejores spas y centros de relajación"
        },
        {
            id: 4,
            image: imagenBlog4,
            title: "Actividades al Aire Libre",
            description: "Vive la naturaleza con actividades emocionantes"
        }
    ]

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + blogs.length) % blogs.length)
    }

    const getVisibleBlogs = () => {
        const visible = []
        for (let i = 0; i < 4; i++) {
            const index = (currentIndex + i) % blogs.length
            visible.push({ ...blogs[index], displayIndex: i })
        }
        return visible
    }

    return (
        <>  
        <div className="flex flex-col items-center justify-center pb-24">
            <h2 className="text-5xl font-family-gideon mb-12">Blog Turístico</h2>
            <div className="flex flex-col items-center justify-center px-8 bg-quaternary">
                
                <div className="relative w-full px-4">
                    {/* Botón Anterior */}
                    <button 
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-800 rounded-full p-3 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                        aria-label="Anterior"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    {/* Contenedor del Carrusel */}
                    <div className="overflow-hidden mx-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 font-family-gideon">
                            {getVisibleBlogs().map((blog) => (
                                <div 
                                    key={`${blog.id}-${blog.displayIndex}`}
                                    className="relative flex flex-col items-center justify-start text-center py-6 px-4 rounded-2xl transition-all duration-300 cursor-pointer group"
                                    onMouseEnter={() => setHoveredBlog(blog.id)}
                                    onMouseLeave={() => setHoveredBlog(null)}
                                >
                                    <div className="relative w-full">
                                        <img 
                                            src={blog.image} 
                                            alt={blog.title} 
                                            className="w-full h-64 object-cover rounded-3xl shadow-lg group-hover:scale-105 transition-transform duration-300" 
                                        />
                                        
                                        {/* Tooltip */}
                                        <div 
                                            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-4 rounded-b-3xl transition-all duration-300 ${
                                                hoveredBlog === blog.id 
                                                    ? 'opacity-100 translate-y-0' 
                                                    : 'opacity-0 translate-y-2 pointer-events-none'
                                            }`}
                                        >
                                            <h3 className="font-bold text-lg mb-1">{blog.title}</h3>
                                            <p className="text-sm text-gray-200">{blog.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botón Siguiente */}
                    <button 
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-800 rounded-full p-3 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                        aria-label="Siguiente"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}
export default Blog