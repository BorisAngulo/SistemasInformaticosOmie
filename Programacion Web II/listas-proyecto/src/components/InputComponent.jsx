
function InputComponent({onChange, valorActual}){
    
    function handleInputChange(event){
        const nuevoValor = event.target.value;
        onChange(nuevoValor);
    }

    return(
        <>
        <div>
            <label htmlFor="nombre" className="text-orange-300 text-shadow-black block text-2xl bg-orange-600 font-bold p-5 rounded w-full">Ingresa un nombre:</label>
            <input 
            type="text"
            id="nombre"
            className="rounded shadow mt-5 bg-orange-300 p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-600"
            placeholder="Ingrese su Nombre"
            value={valorActual}
            onChange={handleInputChange}
             />
        </div>
        </>
    )
}

export default InputComponent;