import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";

const Logo = () => {
    const navigate = useNavigate()
    const { setSearchValue } = useContext(Context)
    return (
        <div className="Logo" onClick={() => { setSearchValue(""); navigate("/"); }}>
            <span>Computer Science</span>
            <span style={{ color: "var(--main_color)" }}>Conference Search</span>
        </div>
    );
}

export default Logo;