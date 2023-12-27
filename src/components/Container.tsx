
const Container = ({ children, className, id }: any) => {
    return (
        <>
            {/* <motion.div
                initial={{ x: 1, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 0, opacity: 0 }}
                transition={{
                    type: "keyframes",
                    stiffness: 5000,
                    damping: 1000,
                }}> */}
                <div id={id} className={`${className} flex mx-auto p-6 max-w-[1440px]`}>
                    {children}
                </div>
            {/* </motion.div> */}
        </>
    )
}

export default Container