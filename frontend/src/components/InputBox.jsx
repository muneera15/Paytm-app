export function InputBox({label, placeholder, onChange}) {
    return <div>
      <div className="text-sm font-medium text-fuchsia-700 text-left py-2">
        {label}
      </div>
      <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border-2 rounded border-cyan-400" />
    </div>
}