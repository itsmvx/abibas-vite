import {Navbar} from "../fragments/Navbar.jsx";
import PropTypes from "prop-types";

export const HomePageComponent = ({userPreferences, setUserPreferences}) => {


    return (
        <>
            <Navbar
                userPreferences={userPreferences}
                setUserPreferences={setUserPreferences}
            />
            <div className="w-full h-96 bg-blue-500">

            </div><div className="w-full h-96 bg-red-500">

            </div><div className="w-full h-96 bg-fuchsia-500">

            </div><div className="w-full h-96 bg-yellow-500">

            </div><div className="w-full h-96 bg-purple-500">

            </div>
        </>
    )
}

HomePageComponent.propTypes = {
    userPreferences: PropTypes.object,
    setUserPreferences: PropTypes.func,
}