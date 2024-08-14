import { useNavigate } from "react-router-dom";
import { Watermark, Image, Button } from "antd";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (

        <Watermark
            content="confsearch"
            className="ErrorPage"
        >
            <div className="ErrorCard">
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                    <Image width="15vw" preview={false} src="/404-error.png" />
                    <div style={{ fontSize: "3rem", fontWeight: "bold" }}>OOPS! PAGE NOT FOUND</div>
                </div>
                <div style={{ fontSize: "2rem", fontWeight: "bold" }}>Sorry, the page you are looking for doesn't exist.</div>

                <Button type="primary" size="large" onClick={() => navigate("/")}>Return Home</Button>
            </div>

        </Watermark>
    )
}

export default ErrorPage;