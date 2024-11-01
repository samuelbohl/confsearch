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

const { TextArea } = Input;

const EventFormDef: DescriptionsProps['items'] = [
    {
        key: "1",
        label: "Event Title",
        children: (
            <Form.Item name="title" style={{ marginBottom: 0, width: "4rem" }} rules={[requiredRule]}>
                <Input />
            </Form.Item>
        ),
    },
    {
        key: "2",
        label: "Acronym",
        children: (
            <Form.Item name="eventAcronym" style={{ marginBottom: 0 }} rules={[requiredRule]}>
                <Input />
            </Form.Item>
        ),
    },
    {
        key: "3",
        label: "Location",
        children: (
            <Form.Item name="location" style={{ marginBottom: 0 }} rules={[requiredRule]}>
                <Input />
            </Form.Item>
        ),
    },
    {
        key: "4",
        label: "Event Website",
        children: (
            <Form.Item name="eventUrl" style={{ marginBottom: 0 }} rules={[requiredRule, urlRule]}>
                <Input />
            </Form.Item>
        ),
    },
    {
        key: "5",
        label: "Event Website (Wikicfp)",
        children: (
            <Form.Item name="wikicfpUrl" style={{ marginBottom: 0 }} rules={[requiredRule, urlRule]}>
                <Input />
            </Form.Item>
        ),
    },
    {
        key: "6",
        label: "Submission Website",
        children: (
            <Form.Item name="submissionUrl" style={{ marginBottom: 0 }} rules={[urlRule]}>
                <Input />
            </Form.Item>
        ),
    },
    {
        key: "7",
        label: "Description",
        children: (
            <Form.Item name="description" style={{ marginBottom: 0 }} rules={[]}>
                <TextArea autoSize />
            </Form.Item>
        ),
    },
    {
        key: "8",
        label: "Deadline Notes",
        children: (
            <Form.Item name="deadlineNotes" style={{ marginBottom: 0 }} rules={[]}>
                <TextArea autoSize />
            </Form.Item>
        ),
    }
]

export default EventFormDef;