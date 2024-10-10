import { DescriptionsProps, Form, Input } from "antd";
import { Rule } from "antd/es/form";

const requiredRule: Rule = { required: true, message: "Cannot be empty" };
const urlRule: Rule = {
    type: "url", 
    message: "Must be a link", 
    transform: (value) => {
        return encodeURI(value);
    },
};

const ConferenceFormDef: DescriptionsProps['items'] = [
    {
        key: "1",
        label: "Acronym",
        children: (
            <Form.Item name="acronym" style={{ marginBottom: 0, width: "4rem" }} rules={[requiredRule]}>
                <Input />
            </Form.Item>
        ),
    },
    {
        key: "2",
        label: "Conference Title",
        children: (
            <Form.Item name="title" style={{ marginBottom: 0 }} rules={[requiredRule]}>
                <Input />
            </Form.Item>
        ),
    },
    // {
    //     key: "3",
    //     label: "Conference Website",
    //     children: (
    //         <Form.Item name="website" style={{ marginBottom: 0 }} rules={[requiredRule, urlRule]}>
    //             <Input />
    //         </Form.Item>
    //     ),
    // },
    {
        key: "3",
        label: "Conference Website (Wikicfp)",
        children: (
            <Form.Item name="wikicfpUrl" style={{ marginBottom: 0 }} rules={[requiredRule, urlRule]}>
                <Input />
            </Form.Item>
        ),
    },
    {
        key: "4",
        label: "Core Rank",
        children: (
            <Form.Item name="coreRank" style={{ marginBottom: 0, width: "4rem" }} rules={[requiredRule]}>
                <Input />
            </Form.Item>
        ),
    },
    {
        key: "5",
        label: "Rank Source",
        children: (
            <Form.Item name="rankSource" style={{ marginBottom: 0, width: "8rem" }} rules={[]}>
                <Input />
            </Form.Item>
        ),
    }
]

export default ConferenceFormDef;