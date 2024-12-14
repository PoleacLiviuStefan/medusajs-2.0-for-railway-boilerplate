import SearchForm from "./searchForm";


export default function SearchModalMobile ({setShowSearchModal}) {
    return(
        <div className="fixed left-0 bottom-0 flex justify-center items-center bg-white w-screen h-full max-h-full max-w-screen overflow-hidden">
            <SearchForm mobile={true} setShowSearchModal={(value)=>setShowSearchModal(value)} />
        </div>
    )
}