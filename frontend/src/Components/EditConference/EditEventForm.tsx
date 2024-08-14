import Form, { FormInstance, Rule } from "antd/es/form";
import { Event } from "../../Services";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditEventForm = ({ form, event }: { form: FormInstance<any>, event: Event | null }) => {


    const requiredRule: Rule = { required: true, message: "Cannot be empty" };

    // const renderDatePicker_Start = (value: Date, record: Event) => {
    //     // debugger;
    //     if (isDisabled(record))
    //         return <DatePicker width="5rem" disabled={isDisabled(record)} value={dayjs(value)} />
    //     else
    //         return (
    //             <Form.Item
    //                 name="start"
    //                 rules={[requiredRule]}
    //                 getValueFromEvent={(onChange) => onChange === undefined ? undefined : dayjs(onChange).toDate()}
    //                 getValueProps={(i) => ({ value: i === undefined ? undefined : dayjs(i) })}
    //             >
    //                 <DatePicker width="5rem" />
    //             </Form.Item>
    //         )
    // };

    const save = async (id: number) => {
        // try {
        //     const row = (await form.validateFields()) as Event;
        //     // debugger;

        //     const newData = [...events];
        //     const index = newData.findIndex((item) => id === item.id);
        //     if (index > -1) {
        //         const item = newData[index];
        //         newData.splice(index, 1, {
        //             ...item,
        //             ...row,
        //         });
        //         setEvents(newData);
        //     }
        // }
        // catch (error) {
        //     console.log(error)
        // }

        // setEditingId(null);

    }


    return (
        <Form
            form={form}
            name="EditEvents"
            initialValues={event ?? {}}
        >
            <Form.Item>

            </Form.Item>
        </Form>
    )
}

export default EditEventForm;