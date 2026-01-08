const Loading = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <video
                src="/T.mp4"
                className='aspect-video max-w-full max-h-full'
                autoPlay
                muted
                playsInline
                loop
            />
        </div>
    )
}

export default Loading
