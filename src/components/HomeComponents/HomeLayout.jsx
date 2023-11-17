import PropTypes from "prop-types";

export const HomeLayout = ({children}) => {
    return (
        <>
            <div className="mt-24 flex flex-col gap-y-20 w-full h-full bg-white ">
                {children}
            </div>
        </>
    )
}

HomeLayout.propTypes = {
    children: PropTypes.any
}