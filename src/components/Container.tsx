const Container = ({ children, className, id }: any) => {
    return (
        <>
            <div id={id} className={`${className} flex mx-auto p-3 lg:p-6 max-w-[1440px]`}>
                {children}
            </div>
        </>
    )
}

export default Container