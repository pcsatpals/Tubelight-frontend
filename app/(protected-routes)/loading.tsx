import { Loader2 } from "lucide-react"

const Loading = () => {
    return (
        <div className='w-full h-[400px] flex items-center justify-center'>
            <Loader2 className="size-6 animate-spin" />
        </div>
    )
}

export default Loading
