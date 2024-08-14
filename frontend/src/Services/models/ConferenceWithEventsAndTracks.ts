/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Conference } from './Conference';
import type { Event } from './Event';
import type { EventTrack } from './EventTrack';
export type ConferenceWithEventsAndTracks = (Conference & {
    events?: Array<(Event & {
        tracks?: Array<EventTrack>;
    })>;
});

