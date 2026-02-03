const Loading = () => {
    return (
        <div className='w-full h-[400px] flex items-center justify-center'>
            <video
                src="/T.mp4"
                className='size-20 max-w-full max-h-full'
                autoPlay
                muted
                playsInline
                loop
            />
        </div>
    )
}

export default Loading
