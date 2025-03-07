const Element = () => {
    return (
        <div className="relative h-full">
            <iframe
                style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    border: 'none'
                }}
                src="http://localhost:5173/doc/"></iframe>
        </div>
    )
}
export default Element
