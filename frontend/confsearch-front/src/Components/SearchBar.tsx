import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { useContext } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Context } from "../Context/Context";

const { Search } = Input

const SearchBar = () => {
    const navigate = useNavigate();
    // const [value, setValue] = useState("");
    const { searchValue, setSearchValue } = useContext(Context)

    const onSearch: SearchProps['onSearch'] = async (value) => {
        // setValue(value)
        navigate({
            pathname: "/search",
            search: createSearchParams({
                query: value
            }).toString()
        })
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
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
        />
    )
};

export default SearchBar;