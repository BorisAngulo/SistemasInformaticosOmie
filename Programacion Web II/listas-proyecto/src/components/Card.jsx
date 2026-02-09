

function Card(props) {

    return (
    <>
    <div className='container w-100 m-10'>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 min-w-36 hover:scale-105 transform transition duration-300">
                        <img className='w-full h-48 object-cover' src={props.image} alt="" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2 text-center">{props.title}</h3>
                            <p className="text-gray-700">{props.description}</p>
                        </div>
      </div>
    </div>
    </>
    )
}

export default Card