/*
 * Copyright (C) 2021 IoT.bzh Company
 * Author: Sébastien Douheret <sebastien@iot.bzh>
 *
 * SPDX-License-Identifier: MIT
 */

export class AFB {
    constructor(base: any, initialtoken?: string);

    setURL(location: string, port?: string): void;

    call(method: string, request: string, callid?: string): Promise<any>;
}
