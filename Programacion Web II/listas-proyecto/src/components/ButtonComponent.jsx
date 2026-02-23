
function ButtonComponent({contenido, textoAdicional="predefinido"}){
    return(
        <>
        <div>
            <button className="p-4 rounded shadow bg-white text-black font-bold hover:bg-purple-600 m-4 transition duration-300">
                {contenido}
                {textoAdicional}
            </button></div>
            
        
        </>

    )
}

export default ButtonComponent;