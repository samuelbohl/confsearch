import IEvent from "./IEvent";

interface IConference {
    id: number,
    title: string,
    acronym: string,
    core_rank: string,
    rank_source?: string,
    website?: string,
    wikicfp_url?: string,
    events?: IEvent[]
}

export default IConference;