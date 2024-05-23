import { Link } from "react-router-dom"

export function BottomWarning({label, buttonText, to}) {
    return <div className="py-2 text-fuchsia-700 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline text-cyan-500 pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
}
  