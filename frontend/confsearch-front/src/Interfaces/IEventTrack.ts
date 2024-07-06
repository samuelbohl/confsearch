interface IEventTrack {
    id: number;
    event_id: number;
    name: string;
    description: string;
    paper_submission: Date;
    abstract_submission: Date;
    notification_due: Date;
    camera_ready_due: Date;
    deadlines_note: string;
}

export default IEventTrack;