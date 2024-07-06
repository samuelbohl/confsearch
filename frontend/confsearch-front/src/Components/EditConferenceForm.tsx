import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import IConference from "../Interfaces/IConference";


const EditConferenceForm = ({ record }: { record: IConference }) => {
    const [form] = useForm()
    return (

        <Form
            // labelCol={{ span: 2 }}
            form={form}
            name="EditConference"
            // wrapperCol={{ span: 18 }}
            labelAlign="left"
            // wrapperCol={{ span: 14 }}
            // onFinish={onFinish}
            layout="inline"
            style={{ width: "100%" }}
            initialValues={record}
        >

            <Form.Item name="id" label="ID" hidden>
                <Input style={{width: "4rem"}} disabled />
            </Form.Item>

            <Form.Item name="acronym" label="Acronym" rules={[{ required: true }]}>
                <Input style={{width: "8rem"}} />
            </Form.Item>

            <Form.Item name="title" label="Conference Title" rules={[{ required: true }]}>
                <Input style={{width: "22rem"}}/>
            </Form.Item>

            <Form.Item name="website" label="Conference Website" rules={[{ required: true }]}>
                <Input style={{width: "15rem"}} type="url" />
            </Form.Item>


            <Form.Item name="core_rank" label="Rank" rules={[{ required: true }]}>
                <Input style={{width: "3rem"}} />
            </Form.Item>

            {/* <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                <Input />
            </Form.Item> */}
            {/* <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                        <Button type="link" htmlType="button" onClick={onFill}>
                            Fill form
                        </Button>
                    </Space>
                </Form.Item> */}
        </Form>
    )
}

export default EditConferenceForm;