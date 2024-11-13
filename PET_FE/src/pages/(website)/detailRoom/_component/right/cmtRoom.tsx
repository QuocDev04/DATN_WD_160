import instance from "@/configs/axios"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const CmtRoom = () => {
    const { id } = useParams()
    const { data } = useQuery({
        queryKey: ['room', id],
        queryFn: () => instance.get(`/room/${id}`)
    })
    return (
        <>
            <>
                <div className="show_description">
                    <section className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:py-6 mb:pt-[19px]">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: data?.data?.roomdescription || "",
                            }}
                        />
                    </section>
                </div>
            </>
        </>
    )
}
export default CmtRoom