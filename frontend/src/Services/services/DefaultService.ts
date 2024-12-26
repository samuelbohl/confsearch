/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Conference } from '../models/Conference';
import type { ConferenceListResponse } from '../models/ConferenceListResponse';
import type { ConferenceResponse } from '../models/ConferenceResponse';
import type { ConferenceWithEventsAndTracksResponse } from '../models/ConferenceWithEventsAndTracksResponse';
import type { ConferenceWithEventsListResponse } from '../models/ConferenceWithEventsListResponse';
import type { EventWithTracks } from '../models/EventWithTracks';
import type { EventWithTracksListResponse } from '../models/EventWithTracksListResponse';
import type { EventWithTracksResponse } from '../models/EventWithTracksResponse';
import type { SuccessResponse } from '../models/SuccessResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Search for conferences
     * @param query
     * @returns ConferenceListResponse Successful response
     * @throws ApiError
     */
    public getApiV1Search(
        query: string,
    ): CancelablePromise<ConferenceListResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/search',
            query: {
                'query': query,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get all events
     * @returns EventWithTracksListResponse Successful response
     * @throws ApiError
     */
    public getApiV1Events(): CancelablePromise<EventWithTracksListResponse> {
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
     * @returns EventWithTracksResponse Event created
     * @throws ApiError
     */
    public postApiV1Events(
        requestBody: EventWithTracks,
    ): CancelablePromise<EventWithTracksResponse> {
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
     * @returns EventWithTracksResponse Successful response
     * @throws ApiError
     */
    public getApiV1Events1(
        eventId: number,
    ): CancelablePromise<EventWithTracksResponse> {
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
     * @returns EventWithTracksResponse Successful response
     * @throws ApiError
     */
    public putApiV1Events(
        eventId: number,
        requestBody: EventWithTracks,
    ): CancelablePromise<EventWithTracksResponse> {
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
     * @returns SuccessResponse Successful response
     * @throws ApiError
     */
    public deleteApiV1Events(
        eventId: number,
    ): CancelablePromise<SuccessResponse> {
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
     * @returns ConferenceWithEventsListResponse Successful response
     * @throws ApiError
     */
    public getApiV1Conferences(): CancelablePromise<ConferenceWithEventsListResponse> {
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
     * @returns ConferenceResponse Conference created
     * @throws ApiError
     */
    public postApiV1Conferences(
        requestBody: Conference,
    ): CancelablePromise<ConferenceResponse> {
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
     * @returns ConferenceWithEventsAndTracksResponse Successful response
     * @throws ApiError
     */
    public getApiV1Conferences1(
        conferenceId: number,
    ): CancelablePromise<ConferenceWithEventsAndTracksResponse> {
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
     * @returns ConferenceResponse Successful response
     * @throws ApiError
     */
    public putApiV1Conferences(
        conferenceId: number,
        requestBody: Conference,
    ): CancelablePromise<ConferenceResponse> {
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
     * @returns SuccessResponse Successful response
     * @throws ApiError
     */
    public deleteApiV1Conferences(
        conferenceId: number,
    ): CancelablePromise<SuccessResponse> {
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
