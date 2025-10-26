import { useState } from "react"
import spaImage from "../assets/spa.png"
import restaurantImage from "../assets/restaurant.png"
import jacuzziImage from "../assets/jacuzzi.png"
import poolImage from "../assets/pool.png"

function Services() {
    const [services, setServices] = useState([
        {
            id: 1,
            name: "Spa",
            description: "Tomate el tiempo de relajarte en nuestro spa especializado",
            image: spaImage
        },
        {
            id: 2,
            name: "Restaurante Gourmet",
            description: "Disfruta de nuestros platos en nuestro restaurant con 3 estrellas michellini",
            image: restaurantImage
        },
        {
            id: 3,
            name: "Jacuzzi",
            description: "Tomate un rejalante baño caliente en nuetro jacuzzi con aguas termales",
            image: jacuzziImage
        },
        {
            id: 4,
            name: "Area de piscina",
            description: "Planea tus fiestas en nuestra piscina temperada",
            image: poolImage
        }
    ])
    return (
        <>
            <div className="flex flex-col items-center justify-center pt-12 pb-24">
                <h2 className="text-5xl font-family-gideon mb-12">Servicios</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 w-10/12 font-family-gideon ">
                    {services.map((service) => (
                        <div key={service.id} className="flex flex-col items-center justify-start text-center h-80">
                            <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-3xl" />
                            <h3 className="text-2xl py-4">{service.name}</h3>
                            <p className="text-gray-600 text-xl px-4 flex-grow flex items-center justify-center">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Services