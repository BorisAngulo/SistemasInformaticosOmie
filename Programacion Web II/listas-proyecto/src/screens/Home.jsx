


function Home() {

    return (
        <>
        <div className="bg-[url('/img/fondoMario.jpg')] bg-cover h-screen flex flex-col items-center justify-center">
       <div className="mb-5">
       <h2 className="text-center text-3xl font-bold">Home</h2>
       <p>Bienvenido a la pagina principal</p>
       </div>
       <div className="flex justify-center mt-10">
       <img src="/img/mario.png" className="animate-bounce h-80 hover:scale-110 transition duration-300"></img>
       </div>
       </div>
        </>
    )
}

export default Home;