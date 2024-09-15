const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-black pb-60 self-center">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-b-4 border-[#FF6340]"></div>
          <p className="text-lg text-[#E7E7E7]">Loading...</p>
        </div>
      </div>
  )
}

export default Loading;