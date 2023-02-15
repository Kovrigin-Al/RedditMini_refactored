type Props = {}
const LoadingPost = (props: Props) => {
  return (
<div className="container animate-pulse ring-1 relative overflow-clip sm:rounded-md lg:container mx-auto bg-white mb-3 ring-slate-200/10 shadow-sm  hover:ring-slate-400"
    >
      {/* left voter block */}
      <div className="absolute h-full hidden w-10 bg-slate-100 left-0 sm:flex flex-col items-center justify-top py-2">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-8/12 h-14 rounded-full"></div>
      </div>

      {/* main block */}
      <div className="pl-0 sm:pl-10">
          <div className="w-full ml-5 flex justify-start items-center h-8 bg-white border-b-slate-800">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-9/12 h-4 rounded-full"></div>
          </div>
          <div className="w-full h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ml-5">

          </div>
          <div className="w-full ml-5 flex justify-start items-center h-8 bg-white border-b-slate-800">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-4/12 h-4 rounded-full"></div>

          </div>
      </div>
    </div>  )
}
export default LoadingPost
