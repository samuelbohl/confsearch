import { CSSProperties } from "react";
import NavBar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";
import Tips from "../Components/Tips";

const MainPage = () => {

    // const rowCSS: CSSProperties = {
    //     display: "flex",
    //     alignItems: "flex-start",
    //     justifyContent: "center",
    //     width: "100%"
    // }

    const columnCSS: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "5rem",
        gap: "10rem"
    }

    return (
        <NavBar>
            
            <div style={columnCSS}>
                <SearchBar />
                <Tips />
            </div>

        </NavBar>
    );
}

export default MainPage;