const ChampDetails = ({ spell }) => {
    return (
        <div className="text-center bg-gray-900 p-2 rounded-xl w-1/2 mb-4">
            <h3 className="text-xl">{spell.name}</h3>
            <p>{spell.description}</p>
        </div>
    )
}

export default ChampDetails