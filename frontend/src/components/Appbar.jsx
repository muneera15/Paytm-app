export const Appbar = () => {
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col font-bold text-cyan-500 justify-center h-full text-xl  ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col font-bold justify-center text-xl text-purple-700 h-full mr-4">
                Hello 
            </div>
            <div className="rounded-full h-11 w-11 font-bold  text-white bg-cyan-400 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {value}
                </div>
            </div>
        </div>
    </div>
}