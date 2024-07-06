import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

const { Search } = Input

const SearchBar = () => {
    const navigate = useNavigate();

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value);
        navigate("/search")
    };

    return (
        <Search
            placeholder="Keywords, authors, related conferences..."
            allowClear
            enterButton="Search"
            size="large"
            // style={{ width: "60rem" }}
            className="SearchBar"
            onSearch={onSearch}
        />
    )
};

export default SearchBar;