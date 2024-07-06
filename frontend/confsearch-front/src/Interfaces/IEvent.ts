import IEventTrack from "./IEventTrack";

interface IEvent {
    id: number;
    title: string;
    conference: string;
    acronym: string;
    start: Date;
    end: Date;
    categories: string;
    tags: string;
    description: string;
    paper_submission: Date;
    abstract_submission: Date;
    notification_due: Date;
    final_due: Date;
    camera_ready: Date;
    deadline_notes: string;
    wikicfp_url: string;
    event_url: string;
    submission_url: string;
    location: string;
    event_track: IEventTrack[];
}

export default IEvent;