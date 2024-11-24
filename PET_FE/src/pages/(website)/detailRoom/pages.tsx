import LeftPagesComponent from "./_component/left/pages"
import RightPagesComponent from "./_component/right/pages"

const DetalRoom = () => {
    return (
        <>
            <div className="container mb-20">
                <div className="grid grid-cols-1 ml-6 mt-3 lg:grid-cols-3 lg:gap-8">
                    <div className="">
                        <LeftPagesComponent />
                    </div>
                    <div className="lg:col-span-2">
                        <RightPagesComponent />
                    </div>
                </div>
            </div>
        </>
    )
}
export default DetalRoom