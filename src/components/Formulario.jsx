import { useState } from "react"

function Formulario() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        fechaEntrada: "",
        fechaSalida: "",
        tipoHabitacion: "",
        numHuespedes: "",
        comentarios: ""
    })

    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState({
        tipo: "", // 'error' o 'success'
        mensaje: ""
    })

    const habitaciones = [
        { id: 1, nombre: "Habitacion Matrimonial", precio: 60 },
        { id: 2, nombre: "Habitacion Doble", precio: 80 },
        { id: 3, nombre: "Suit Familiar", precio: 120 }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const validarTelefono = (telefono) => {
        const regex = /^[0-9]{10,}$/
        return regex.test(telefono)
    }

    const validarFechas = (fechaEntrada, fechaSalida) => {
        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)
        const entrada = new Date(fechaEntrada)
        const salida = new Date(fechaSalida)
        
        if (entrada < hoy) {
            return "La fecha de entrada no puede ser anterior a hoy"
        }
        if (salida <= entrada) {
            return "La fecha de salida debe ser posterior a la fecha de entrada"
        }
        return null
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validar campos vacíos
        if (!formData.nombre.trim()) {
            mostrarModal("error", "El nombre es obligatorio")
            return
        }

        if (!formData.email.trim()) {
            mostrarModal("error", "El email es obligatorio")
            return
        }

        if (!validarEmail(formData.email)) {
            mostrarModal("error", "El email no es válido")
            return
        }

        if (!formData.telefono.trim()) {
            mostrarModal("error", "El teléfono es obligatorio")
            return
        }

        if (!validarTelefono(formData.telefono)) {
            mostrarModal("error", "El teléfono debe tener al menos 10 dígitos numéricos")
            return
        }

        if (!formData.fechaEntrada) {
            mostrarModal("error", "La fecha de entrada es obligatoria")
            return
        }

        if (!formData.fechaSalida) {
            mostrarModal("error", "La fecha de salida es obligatoria")
            return
        }

        const errorFechas = validarFechas(formData.fechaEntrada, formData.fechaSalida)
        if (errorFechas) {
            mostrarModal("error", errorFechas)
            return
        }

        if (!formData.tipoHabitacion) {
            mostrarModal("error", "Debe seleccionar un tipo de habitación")
            return
        }

        if (!formData.numHuespedes || formData.numHuespedes < 1) {
            mostrarModal("error", "El número de huéspedes debe ser al menos 1")
            return
        }

        // Si todas las validaciones pasan
        const habitacionSeleccionada = habitaciones.find(h => h.id === parseInt(formData.tipoHabitacion))
        const fechaEntrada = new Date(formData.fechaEntrada)
        const fechaSalida = new Date(formData.fechaSalida)
        const noches = Math.ceil((fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24))
        const total = noches * habitacionSeleccionada.precio

        mostrarModal("success", 
            `¡Reserva confirmada! ${formData.nombre}, tu reserva de ${noches} ${noches === 1 ? 'noche' : 'noches'} en ${habitacionSeleccionada.nombre} tiene un costo total de $${total}. Te contactaremos a ${formData.email} para confirmar los detalles.`
        )

        // Limpiar formulario
        setFormData({
            nombre: "",
            email: "",
            telefono: "",
            fechaEntrada: "",
            fechaSalida: "",
            tipoHabitacion: "",
            numHuespedes: "",
            comentarios: ""
        })
    }

    const mostrarModal = (tipo, mensaje) => {
        setModalContent({ tipo, mensaje })
        setShowModal(true)
    }

    const cerrarModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center pt-12 pb-24 bg-tertiary">
                <h2 className="text-5xl font-family-gideon mb-12">Reserva Tu Habitación</h2>
                
                <div className="w-10/12 md:w-8/12 lg:w-6/12 bg-white p-8 rounded-2xl shadow-lg">
                    <form onSubmit={handleSubmit} className="font-family-gidugu">
                        {/* Nombre */}
                        <div className="mb-6">
                            <label htmlFor="nombre" className="block text-xl mb-2 text-secondary font-bold">
                                Nombre Completo <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all duration-300"
                                placeholder="Ingresa tu nombre completo"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-xl mb-2 text-secondary font-bold">
                                Correo Electrónico <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all duration-300"
                                placeholder="correo@ejemplo.com"
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="mb-6">
                            <label htmlFor="telefono" className="block text-xl mb-2 text-secondary font-bold">
                                Teléfono <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all duration-300"
                                placeholder="1234567890"
                            />
                        </div>

                        {/* Fechas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="fechaEntrada" className="block text-xl mb-2 text-secondary font-bold">
                                    Fecha de Entrada <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="fechaEntrada"
                                    name="fechaEntrada"
                                    value={formData.fechaEntrada}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="fechaSalida" className="block text-xl mb-2 text-secondary font-bold">
                                    Fecha de Salida <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="fechaSalida"
                                    name="fechaSalida"
                                    value={formData.fechaSalida}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Tipo de Habitación */}
                        <div className="mb-6">
                            <label htmlFor="tipoHabitacion" className="block text-xl mb-2 text-secondary font-bold">
                                Tipo de Habitación <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="tipoHabitacion"
                                name="tipoHabitacion"
                                value={formData.tipoHabitacion}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all duration-300"
                            >
                                <option value="">Selecciona una habitación</option>
                                {habitaciones.map((habitacion) => (
                                    <option key={habitacion.id} value={habitacion.id}>
                                        {habitacion.nombre} - ${habitacion.precio}/noche
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Número de Huéspedes */}
                        <div className="mb-6">
                            <label htmlFor="numHuespedes" className="block text-xl mb-2 text-secondary font-bold">
                                Número de Huéspedes <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="numHuespedes"
                                name="numHuespedes"
                                value={formData.numHuespedes}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all duration-300"
                                placeholder="Ej: 2"
                            />
                        </div>

                        {/* Comentarios */}
                        <div className="mb-6">
                            <label htmlFor="comentarios" className="block text-xl mb-2 text-secondary font-bold">
                                Comentarios Adicionales (Opcional)
                            </label>
                            <textarea
                                id="comentarios"
                                name="comentarios"
                                value={formData.comentarios}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary transition-all duration-300 resize-none"
                                placeholder="Alguna petición especial o comentario..."
                            />
                        </div>

                        {/* Botón de Envío */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-primary text-secondary px-8 py-4 rounded-full text-xl font-bold hover:bg-secondary hover:text-primary transition-all duration-600 cursor-pointer"
                            >
                                Confirmar Reserva
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
                        <div className="text-center">
                            {modalContent.tipo === "error" ? (
                                <div className="mb-4">
                                    <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            )}
                            
                            <h3 className={`text-2xl font-family-gideon mb-4 ${modalContent.tipo === "error" ? "text-red-600" : "text-green-600"}`}>
                                {modalContent.tipo === "error" ? "Error en la Reserva" : "¡Reserva Exitosa!"}
                            </h3>
                            
                            <p className="text-lg font-family-gidugu text-gray-700 mb-6">
                                {modalContent.mensaje}
                            </p>
                            
                            <button
                                onClick={cerrarModal}
                                className="bg-primary text-secondary px-6 py-3 rounded-full text-lg font-bold hover:bg-secondary hover:text-primary transition-all duration-600 cursor-pointer"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Formulario

