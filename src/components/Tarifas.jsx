import { useState } from "react"
import roomMatrimonial from "../assets/room1.png"
import habitacionDoble from "../assets/room2.png"
import habitacionSuite from "../assets/room3.png"
function Tarifas() {
    const [tarifas, setTarifas] = useState([
        {
            id: 1,
            name: "Habitacion Matrimonial",
            price: 60,
            image: roomMatrimonial
        },
        {
            id: 2,
            name: "Habitacion Doble",
            price: 80,
            image: habitacionDoble
        },
        {
            id: 3,
            name: "Suit Familiar",
            price: 120,
            image: habitacionSuite
        }
    ])
    return (
        <>
            <div className="flex flex-col items-center justify-center pt-12 pb-24">
                <h2 className="text-5xl font-family-gideon mb-12">Tarifas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-10/12 font-family-gideon">
                    {tarifas.map((tarifa) => (
                        <div key={tarifa.id} className="flex flex-col items-center justify-start text-center bg-tertiary p-8 rounded-2xl hover:scale-105 transition-all duration-600 cursor-pointer">
                            <img src={tarifa.image} alt={tarifa.name} className="w-full h-48 object-cover rounded-3xl" />
                            <h3 className="text-3xl py-4">{tarifa.name}</h3>
                            <p className="text-black text-3xl px-4 flex items-center justify-center">
                                {tarifa.price}$ / noche</p>
                        </div>
                    ))}
                </div>
                <button className="bg-primary text-secondary px-6 py-3 rounded-full text-xl mt-16 font-bold hover:bg-secondary hover:text-primary transition-all duration-600 cursor-pointer">Reserva Ahora</button>
            </div>
        </>
    )
}
export default Tarifas