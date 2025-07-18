
function ItemBox({title, by, found, clickNavigate, img}) {

  return (
    
    <>
      <div className="w-full h-auto px-3 py-3 rounded-md bg-zinc-800 flex flex-col justify-evenly items-center gap-2 overflow-hidden">
        <img src={img} className='h-32 w-full rounded-lg object-cover' />
        <h1 className="w-full text-white text-start text-sm lg:text-xl font-semibold font-Montserrat capitalize">{title}</h1>
        <p className="w-full text-start text-gray-300 text-[10px] lg:text-sm">Found By : {by}</p>
        <p className="w-full text-start text-gray-300 text-[10px] lg:text-sm capitalize">Found at : {found}</p>
        <p className="w-full px-4 py-1 md:py-2 rounded-full bg-white text-black text-center text-[12px] lg:text-sm mt-2 cursor-pointer hover:opacity-70 duration-200 ease-in-out" onClick={clickNavigate}>View ●</p>
      </div>
    </>
  )
}

export default ItemBox
