import IConference from "../Interfaces/IConference";

const dataSource: IConference[] = [
	{
		id: 1,
		title: "International Conference on Artificial Intelligence",
		acronym: "ICAI",
		core_rank: "A",
		rank_source: "CORE",
		website: "https://www.icai.org",
		wikicfp_url: "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=12345",
		events: [
			{
				id: 1,
				title: "ICAI 2024",
				conference: "International Conference on Artificial Intelligence",
				acronym: "ICAI",
				start: new Date("2024-08-01"),
				end: new Date("2024-08-05"),
				categories: "Artificial Intelligence, Machine Learning",
				tags: "AI, ML, Deep Learning",
				description: "The premier conference on Artificial Intelligence.",
				paper_submission: new Date("2024-04-01"),
				abstract_submission: new Date("2024-03-15"),
				notification_due: new Date("2024-05-15"),
				final_due: new Date("2024-06-01"),
				camera_ready: new Date("2024-07-01"),
				deadline_notes: "No extensions will be granted.",
				wikicfp_url: "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=12345",
				event_url: "https://www.icai.org/2024",
				submission_url: "https://www.icai.org/2024/submit",
				location: "New York, USA",
				event_track: [
					{
						id: 1,
						event_id: 1,
						name: "Main Track",
						description: "The main track of the conference.",
						paper_submission: new Date("2024-04-01"),
						abstract_submission: new Date("2024-03-15"),
						notification_due: new Date("2024-05-15"),
						camera_ready_due: new Date("2024-07-01"),
						deadlines_note: "No extensions will be granted for the main track."
					},
					{
						id: 2,
						event_id: 1,
						name: "Workshop on AI Ethics",
						description: "A workshop focused on ethical issues in AI.",
						paper_submission: new Date("2024-04-15"),
						abstract_submission: new Date("2024-04-01"),
						notification_due: new Date("2024-05-30"),
						camera_ready_due: new Date("2024-07-15"),
						deadlines_note: "Ethics workshop deadlines are strict."
					}
				]
			}
		]
	},
	{
		id: 2,
		title: "International Conference on Data Science",
		acronym: "ICDS",
		core_rank: "B",
		rank_source: "CORE",
		website: "https://www.icds.org",
		wikicfp_url: "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=67890",
		events: [
			{
				id: 2,
				title: "ICDS 2024",
				conference: "International Conference on Data Science",
				acronym: "ICDS",
				start: new Date("2024-09-15"),
				end: new Date("2024-09-20"),
				categories: "Data Science, Big Data",
				tags: "Data, Analytics, Machine Learning",
				description: "Leading conference on Data Science and Big Data.",
				paper_submission: new Date("2024-05-15"),
				abstract_submission: new Date("2024-05-01"),
				notification_due: new Date("2024-06-30"),
				final_due: new Date("2024-07-15"),
				camera_ready: new Date("2024-08-15"),
				deadline_notes: "Late submissions will not be accepted.",
				wikicfp_url: "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=67890",
				event_url: "https://www.icds.org/2024",
				submission_url: "https://www.icds.org/2024/submit",
				location: "San Francisco, USA",
				event_track: [
					{
						id: 3,
						event_id: 2,
						name: "Data Science Research Track",
						description: "Research track for presenting cutting-edge Data Science work.",
						paper_submission: new Date("2024-05-15"),
						abstract_submission: new Date("2024-05-01"),
						notification_due: new Date("2024-06-30"),
						camera_ready_due: new Date("2024-08-15"),
						deadlines_note: "No late submissions for research track."
					},
					{
						id: 4,
						event_id: 2,
						name: "Industry Track",
						description: "Track focused on industry applications of Data Science.",
						paper_submission: new Date("2024-05-20"),
						abstract_submission: new Date("2024-05-05"),
						notification_due: new Date("2024-07-05"),
						camera_ready_due: new Date("2024-08-20"),
						deadlines_note: "Industry track deadlines are strict."
					}
				]
			}
		]
	},
	{
        id: 3,
        title: "International Conference on Cyber Security",
        acronym: "ICCS",
        core_rank: "A",
        rank_source: "CORE",
        website: "https://www.iccs.org",
        wikicfp_url: "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=23456",
        events: [
            {
                id: 3,
                title: "ICCS 2024",
                conference: "International Conference on Cyber Security",
                acronym: "ICCS",
                start: new Date("2024-10-10"),
                end: new Date("2024-10-14"),
                categories: "Cyber Security, Information Security",
                tags: "Cybersecurity, InfoSec, Network Security",
                description: "A top conference focusing on all aspects of cyber security.",
                paper_submission: new Date("2024-06-01"),
                abstract_submission: new Date("2024-05-15"),
                notification_due: new Date("2024-07-15"),
                final_due: new Date("2024-08-01"),
                camera_ready: new Date("2024-09-01"),
                deadline_notes: "Submissions are final and no extensions will be granted.",
                wikicfp_url: "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=23456",
                event_url: "https://www.iccs.org/2024",
                submission_url: "https://www.iccs.org/2024/submit",
                location: "Berlin, Germany",
                event_track: [
                    {
                        id: 5,
                        event_id: 3,
                        name: "Main Conference Track",
                        description: "Main track for novel research in cyber security.",
                        paper_submission: new Date("2024-06-01"),
                        abstract_submission: new Date("2024-05-15"),
                        notification_due: new Date("2024-07-15"),
                        camera_ready_due: new Date("2024-09-01"),
                        deadlines_note: "Strict deadlines for the main track."
                    },
                    {
                        id: 6,
                        event_id: 3,
                        name: "Workshop on Network Security",
                        description: "Focused workshop on securing network infrastructures.",
                        paper_submission: new Date("2024-06-15"),
                        abstract_submission: new Date("2024-06-01"),
                        notification_due: new Date("2024-07-30"),
                        camera_ready_due: new Date("2024-09-15"),
                        deadlines_note: "No late submissions for the workshop."
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "International Conference on Blockchain Technology",
        acronym: "ICBT",
        core_rank: "B",
        rank_source: "CORE",
        website: "https://www.icbt.org",
        wikicfp_url: "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=34567",
        events: [
            {
                id: 4,
                title: "ICBT 2024",
                conference: "International Conference on Blockchain Technology",
                acronym: "ICBT",
                start: new Date("2024-11-05"),
                end: new Date("2024-11-09"),
                categories: "Blockchain, Distributed Ledger",
                tags: "Blockchain, Cryptocurrency, DLT",
                description: "Exploring the latest advancements in blockchain technology.",
                paper_submission: new Date("2024-07-01"),
                abstract_submission: new Date("2024-06-15"),
                notification_due: new Date("2024-08-15"),
                final_due: new Date("2024-09-01"),
                camera_ready: new Date("2024-10-01"),
                deadline_notes: "Ensure submissions are on time, no extensions.",
                wikicfp_url: "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=34567",
                event_url: "https://www.icbt.org/2024",
                submission_url: "https://www.icbt.org/2024/submit",
                location: "Tokyo, Japan",
                event_track: [
                    {
                        id: 7,
                        event_id: 4,
                        name: "Technical Track",
                        description: "Technical track for blockchain research and development.",
                        paper_submission: new Date("2024-07-01"),
                        abstract_submission: new Date("2024-06-15"),
                        notification_due: new Date("2024-08-15"),
                        camera_ready_due: new Date("2024-10-01"),
                        deadlines_note: "Technical track deadlines are final."
                    },
                    {
                        id: 8,
                        event_id: 4,
                        name: "Blockchain in Finance",
                        description: "Exploring blockchain applications in the financial sector.",
                        paper_submission: new Date("2024-07-15"),
                        abstract_submission: new Date("2024-07-01"),
                        notification_due: new Date("2024-08-30"),
                        camera_ready_due: new Date("2024-10-15"),
                        deadlines_note: "Finance track deadlines must be adhered to."
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "International Conference on Robotics and Automation",
        acronym: "ICRA",
        core_rank: "A",
        rank_source: "CORE",
        website: "https://www.icra.org",
        wikicfp_url: "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=45678",
        events: [
            {
                id: 5,
                title: "ICRA 2024",
                conference: "International Conference on Robotics and Automation",
                acronym: "ICRA",
                start: new Date("2024-12-01"),
                end: new Date("2024-12-05"),
                categories: "Robotics, Automation",
                tags: "Robotics, Automation, AI",
                description: "The leading conference on robotics and automation technologies.",
                paper_submission: new Date("2024-08-01"),
                abstract_submission: new Date("2024-07-15"),
                notification_due: new Date("2024-09-15"),
                final_due: new Date("2024-10-01"),
                camera_ready: new Date("2024-11-01"),
                deadline_notes: "No late submissions will be accepted.",
                wikicfp_url: "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=45678",
                event_url: "https://www.icra.org/2024",
                submission_url: "https://www.icra.org/2024/submit",
                location: "Paris, France",
                event_track: [
                    {
                        id: 9,
                        event_id: 5,
                        name: "Main Track",
                        description: "Main track for robotics and automation research.",
                        paper_submission: new Date("2024-08-01"),
                        abstract_submission: new Date("2024-07-15"),
                        notification_due: new Date("2024-09-15"),
                        camera_ready_due: new Date("2024-11-01"),
                        deadlines_note: "Main track deadlines are strict."
                    },
                    {
                        id: 10,
                        event_id: 5,
                        name: "Workshop on AI in Robotics",
                        description: "Workshop discussing the integration of AI in robotics.",
                        paper_submission: new Date("2024-08-15"),
                        abstract_submission: new Date("2024-08-01"),
                        notification_due: new Date("2024-09-30"),
                        camera_ready_due: new Date("2024-11-15"),
                        deadlines_note: "AI workshop deadlines must be met."
                    }
                ]
            }
        ]
    }
];

export default dataSource;