export default function SuspenseFallback() {
  return <div className="border-2 p-2 flex-1">
    Loading [<span className="before:animate-[.5s_linear_infinite_loading]"></span>]
  </div>
}