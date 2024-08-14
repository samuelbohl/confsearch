import { Form, Input } from "antd";
import { Rule } from "antd/es/form";


const EditConferenceForm = () => {

    const requiredRule: Rule = { required: true, message: "Cannot be empty" };
    const urlRule: Rule = { type: "url", message: "Must be a link" };

    return (
        <div style={{ display: "inline-flex", gap: "2rem", flexWrap: "wrap" }}>
            <Form.Item name="id" label="ID" hidden>
                <Input style={{ width: "4rem" }} disabled />
            </Form.Item>

            <Form.Item name="acronym" label="Acronym" rules={[requiredRule]}>
                <Input style={{ width: "8rem" }} />
            </Form.Item>

            <Form.Item name="title" label="Conference Title" rules={[requiredRule]}>
                <Input style={{ width: "22rem" }} />
            </Form.Item>

            <Form.Item name="website" label="Conference Website" rules={[requiredRule, urlRule]}>
                <Input style={{ width: "15rem" }} type="url" />
            </Form.Item>

            <Form.Item name="wikicfp_url" label="Wikicfp URL" rules={[requiredRule, urlRule]}>
                <Input style={{ width: "15rem" }} type="url" />
            </Form.Item>

            <Form.Item name="core_rank" label="Rank" rules={[requiredRule]}>
                <Input style={{ width: "3rem" }} />
            </Form.Item>
        </div>
    )
}

export default EditConferenceForm;