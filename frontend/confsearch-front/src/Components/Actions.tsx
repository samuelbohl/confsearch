import { Button, Divider, Space } from "antd";
import { useNavigate } from "react-router-dom";

const Actions = () => {

    const navigate = useNavigate();

    return (
        <div className="Main_Actions">
            <Divider style={{ width: "100%", fontSize: "20px" }} orientation="right" plain={false}>Actions</Divider>
            <Space direction="vertical" align="end" style={{ width: "100%" }}>

                <Space>
                    <Button type="primary" size="large" danger onClick={() => navigate("?query=Donald+E.+Knuth")}>Donald E. Knuth</Button>
                    <Button type="primary" size="large" danger onClick={() => navigate("?query=high-performance+computing+regression")}>high-performance computing</Button>
                </Space>
                <Space>

                    <Button type="primary" size="large" danger onClick={() => navigate("?query=RTSS")}>IEEE Real-Time Systems Symposium</Button>
                    <Button type="primary" size="large" danger onClick={() => navigate("?query=LICS+STOC+FOCS+STACS")}>LICS STOC FOCS STACS</Button>
                </Space>


            </Space>
        </div>
    )
}

export default Actions;