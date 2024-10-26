import LeftPetMagazine from "./_component/Left/LeftPetMagazine"
import Right from "./_component/Right/Right"

const PetMagazine = () => {
    return (
        <>
            <img src="https://theme.hstatic.net/1000238938/1000576591/14/banner_collection.jpg?v=386" alt="" className="w-full" />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 bg-white">
                <div className="">
                    <LeftPetMagazine/>
                </div>
                <div className="lg:col-span-2">
                    <Right/>
                </div>
            </div>
        </>
    )
}
export default PetMagazine