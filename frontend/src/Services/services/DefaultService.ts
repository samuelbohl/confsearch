/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Conference } from '../models/Conference';
import type { ConferenceWithEvents } from '../models/ConferenceWithEvents';
import type { ConferenceWithEventsAndTracks } from '../models/ConferenceWithEventsAndTracks';
import type { EventWithTracks } from '../models/EventWithTracks';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Search for conferences
     * @param keyword
     * @returns Conference List of conferences
     * @throws ApiError
     */
    public getApiV1Search(
        keyword: string,
    ): CancelablePromise<Array<Conference>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/search',
            query: {
                'keyword': keyword,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get all events
     * @returns EventWithTracks List of events
     * @throws ApiError
     */
    public getApiV1Events(): CancelablePromise<Array<EventWithTracks>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/events',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Create a new event
     * @param requestBody
     * @returns EventWithTracks Event created
     * @throws ApiError
     */
    public postApiV1Events(
        requestBody: EventWithTracks,
    ): CancelablePromise<EventWithTracks> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/events',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get an event by ID
     * @param eventId
     * @returns EventWithTracks Event details
     * @throws ApiError
     */
    public getApiV1Events1(
        eventId: number,
    ): CancelablePromise<EventWithTracks> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/events/{eventId}',
            path: {
                'eventId': eventId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Update an event
     * @param eventId
     * @param requestBody
     * @returns EventWithTracks Event updated
     * @throws ApiError
     */
    public putApiV1Events(
        eventId: number,
        requestBody: EventWithTracks,
    ): CancelablePromise<EventWithTracks> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/events/{eventId}',
            path: {
                'eventId': eventId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Delete an event
     * @param eventId
     * @returns void
     * @throws ApiError
     */
    public deleteApiV1Events(
        eventId: number,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/events/{eventId}',
            path: {
                'eventId': eventId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get all conferences with their associated events
     * @returns ConferenceWithEvents List of conferences with events
     * @throws ApiError
     */
    public getApiV1Conferences(): CancelablePromise<Array<ConferenceWithEvents>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/conferences',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Create a new conference
     * @param requestBody
     * @returns Conference Conference created
     * @throws ApiError
     */
    public postApiV1Conferences(
        requestBody: Conference,
    ): CancelablePromise<Conference> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/conferences',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get a conference by ID with associated events and event tracks
     * @param conferenceId
     * @returns ConferenceWithEventsAndTracks Conference details with events and event tracks
     * @throws ApiError
     */
    public getApiV1Conferences1(
        conferenceId: number,
    ): CancelablePromise<ConferenceWithEventsAndTracks> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/conferences/{conferenceId}',
            path: {
                'conferenceId': conferenceId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Update a conference
     * @param conferenceId
     * @param requestBody
     * @returns Conference Conference updated
     * @throws ApiError
     */
    public putApiV1Conferences(
        conferenceId: number,
        requestBody: Conference,
    ): CancelablePromise<Conference> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/conferences/{conferenceId}',
            path: {
                'conferenceId': conferenceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Delete a conference
     * @param conferenceId
     * @returns void
     * @throws ApiError
     */
    public deleteApiV1Conferences(
        conferenceId: number,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/conferences/{conferenceId}',
            path: {
                'conferenceId': conferenceId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
}
