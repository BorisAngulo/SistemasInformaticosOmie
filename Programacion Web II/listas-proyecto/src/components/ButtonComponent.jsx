
function ButtonComponent({contenido, textoAdicional="predefinido"}){
    return(
        <>
        <div>
            <button className="p-4 rounded shadow bg-orange-600 text-orange-300 font-bold hover:bg-purple-600 m-4 transition duration-300">
                {contenido}
                {textoAdicional}
            </button></div>
            
        
        </>

    )
}

export default ButtonComponent;