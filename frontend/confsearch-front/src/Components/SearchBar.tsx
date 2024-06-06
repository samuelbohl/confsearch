import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";

const { Search } = Input

const SearchBar = () => {

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

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