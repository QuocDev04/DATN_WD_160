import LeftPagesComponent from "./_component/left/pages"
import RightPagesComponent from "./_component/right/pages"

const DetalRoom = () => {
    return (
        <>
            <div className="grid grid-cols-1 mt-2 gap-4 lg:grid-cols-3 lg:gap-8">
                <div className="">
                    <LeftPagesComponent/>
                </div>
                <div className="lg:col-span-2">
                    <RightPagesComponent/>
                </div>
            </div>
        </>
    )
}
export default DetalRoom