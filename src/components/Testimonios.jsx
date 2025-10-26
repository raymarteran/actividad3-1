import { useState } from "react"
function Testimonios() {
    const [testimonios, setTestimonios] = useState([
        {
            id: 1,
            name: "Juan Perez",
            title: "Increible",
            testimonio: "Tienen que vivir la experiencia, dense la oportunidad...",
            date:'30/08/2025',
            starts: 5
        },
        {
            id: 2,
            name: "Maria Gomez",
            title: "El mejor hotel",
            testimonio: "Sin duda alguna volveria a ir, desde la comida, las habitaciones, todo, absolutamente todo divino",
            date:'30/08/2025',
            starts: 5
        },
    ])
    return (
        <>
            <div className="flex flex-col items-center justify-center pb-24">
                <h2 className="text-5xl font-family-gideon mb-12">Testimonios</h2>
                <div className="flex flex-row items-stretch justify-center w-full font-family-gideon px-16 gap-32">
                    {testimonios.map((testimonio) => (
                        <div key={testimonio.id} className="flex flex-row items-center justify-start text-center p-8 rounded-2xl border border-black w-1/2 h-40 hover:scale-105 transition-all duration-600 cursor-pointer">
                            <div className="w-1/2 flex items-start justify-center">
                                {/* Estrellas */}
                                <div className="flex flex-row gap-1">
                                    {[...Array(testimonio.starts)].map((_, index) => (
                                        <span key={index} className="text-yellow-400 text-3xl">⭐</span>
                                    ))}
                                </div>
                            </div>
                            <div className="w-1/2 flex items-start justify-center flex-col relative text-left">
                                <p className="text-2xl">{testimonio.title}</p>
                                <p className="text-lg mt-2">{testimonio.testimonio}</p>
                                <p className="absolute right-0 top-0">{testimonio.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Testimonios