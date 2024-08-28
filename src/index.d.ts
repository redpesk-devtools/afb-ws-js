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

export interface AFBEvent {
    jtype: string;
    event: string;
    data?: any;
}

export interface AFBReply {
    jtype: string;
    request: { status: string, code: number };
    response?: any;
}

export interface AFBContext {
    token: string;
    uuid: string | undefined;
}

export class AFB {
    context: AFBContext;
    ws: (on_open: () => void, on_abort: () => void) => void;

    constructor(
        base: string | {base: string, initialtoken: string},
        initialtoken?: string
    );

    setURL(location: string, port?: string): void;
}
