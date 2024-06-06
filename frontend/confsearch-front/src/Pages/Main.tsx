import { CSSProperties } from "react";
import NavBar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";
import Tips from "../Components/Tips";
// import { Button } from "antd";
import SearchSuggestions from "../Components/SearchSuggestions";
import Actions from "../Components/Actions";

const MainPage = () => {

    // const rowCSS: CSSProperties = {
    //     display: "flex",
    //     alignItems: "flex-start",
    //     justifyContent: "center",
    //     width: "100%"
    // }

    return (
        <NavBar>

            <div className="Main_Body">
                <SearchBar />

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%"
                }}>

                    <Tips />

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%"
                    }}>
                        <SearchSuggestions />
                        <Actions />
                    </div>
                </div>
            </div>

        </NavBar>
    );
}

export default MainPage;