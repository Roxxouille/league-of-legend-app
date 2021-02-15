const ChampDetails = ({ spell }) => {
    return (
        <div className="text-center bg-gray-900 p-2 rounded-xl w-1/2 mb-4">
            <h3 className="text-xl">{spell.name}</h3>
            <p dangerouslySetInnerHTML={{ __html: spell.description}}/>
        </div>
    )
}

export default ChampDetails