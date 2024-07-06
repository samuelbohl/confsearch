import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate()
    return (
        <div className="Logo" onClick={() => navigate("/")}>
            <span>Computer Science</span>
            <span style={{color: "var(--main_color)"}}>Conference Search</span>
        </div>
    );
}

export default Logo;