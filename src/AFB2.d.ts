/*
 * Copyright (C) 2015-2024 "IoT.bzh"
 * Author: José Bollo <jose.bollo@iot.bzh>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

interface GetURLParams {
    protocol?: string;
    hostname?: string;
    port?: string | number;
    path?: string;
};

export function getURL(parameters?: GetURLParams): string;

type AfbWsProtocol = 'rpc' | 'json1';

interface AfbWsConnectParams extends GetURLParams {
    url?: string;
    session?: string;
    token?: string;
    onopen(afbws: AfbWs): void;
    onabort?(reason: string, url: string): void;
    expected?: AfbWsProtocol | AfbWsProtocol[];
};

declare class AfbWs {
    call(api: string, verb: string, args: any[], onreply: (rc: int, values: any[]) => void): void;
    callPromise(api: string, verb: string, args: any[]): Promise<[number,any[]]>;
    addEvent(name: string, handler: (values: any[], name: string) => void): void;
    dropEvent(name: string, handler?: (values: any[], name: string) => void): void;
    close(): void;
    url: string;
    protocol: AfbWsProtocol;
    parameters: AfbWsConnectParams;
    onclose?();
    onerror?();
};

export function afbWsConnect(parameters: AfbWsConnectParams): void;

export const AFB_ERRNO_INTERNAL_ERROR     :  -1;
export const AFB_ERRNO_OUT_OF_MEMORY      :  -2;
export const AFB_ERRNO_UNKNOWN_API        :  -3;
export const AFB_ERRNO_UNKNOWN_VERB       :  -4;
export const AFB_ERRNO_NOT_AVAILABLE      :  -5;
export const AFB_ERRNO_UNAUTHORIZED       :  -6;
export const AFB_ERRNO_INVALID_TOKEN      :  -7;
export const AFB_ERRNO_FORBIDDEN          :  -8;
export const AFB_ERRNO_INSUFFICIENT_SCOPE :  -9;
export const AFB_ERRNO_BAD_API_STATE      : -10;
export const AFB_ERRNO_NO_REPLY           : -11;
export const AFB_ERRNO_INVALID_REQUEST    : -12;
export const AFB_ERRNO_NO_ITEM            : -13;
export const AFB_ERRNO_BAD_STATE          : -14;
export const AFB_ERRNO_DISCONNECTED       : -15;
export const AFB_ERRNO_TIMEOUT            : -16;
