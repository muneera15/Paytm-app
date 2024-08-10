export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="font-bold text-purple-700 text-lg">
            Your balance
        </div>
        <div className="font-bold ml-4 text-cyan-500 text-lg">
            Rs {(value).toFixed(2)}
        </div>
    </div>
}