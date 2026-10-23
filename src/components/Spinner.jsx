function Spinner() {
  return (
    <div className="flex items-center justify-center p-4 border fixed z-10 w-[100vw] h-[100vh] bg-white flex-col">

      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 "  />
      <p className="text-[#9e9a9a]">Loading products...</p>
    </div>


  
  );
}



export default Spinner;