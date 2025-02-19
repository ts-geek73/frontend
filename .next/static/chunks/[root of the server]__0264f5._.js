(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__0264f5._.js", {

"[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Adapted from https://github.com/vercel/next.js/blob/canary/packages/next/src/client/dev/error-overlay/websocket.ts
__turbopack_esm__({
    "addMessageListener": (()=>addMessageListener),
    "connectHMR": (()=>connectHMR),
    "sendMessage": (()=>sendMessage)
});
let source;
const eventCallbacks = [];
// TODO: add timeout again
// let lastActivity = Date.now()
function getSocketProtocol(assetPrefix) {
    let protocol = location.protocol;
    try {
        // assetPrefix is a url
        protocol = new URL(assetPrefix).protocol;
    } catch (_) {}
    return protocol === "http:" ? "ws" : "wss";
}
function addMessageListener(cb) {
    eventCallbacks.push(cb);
}
function sendMessage(data) {
    if (!source || source.readyState !== source.OPEN) return;
    return source.send(data);
}
function connectHMR(options) {
    const { timeout = 5 * 1000 } = options;
    function init() {
        if (source) source.close();
        console.log("[HMR] connecting...");
        function handleOnline() {
            const connected = {
                type: "turbopack-connected"
            };
            eventCallbacks.forEach((cb)=>{
                cb(connected);
            });
            if (options.log) console.log("[HMR] connected");
        // lastActivity = Date.now()
        }
        function handleMessage(event) {
            // lastActivity = Date.now()
            const message = {
                type: "turbopack-message",
                data: JSON.parse(event.data)
            };
            eventCallbacks.forEach((cb)=>{
                cb(message);
            });
        }
        // let timer: NodeJS.Timeout
        function handleDisconnect() {
            source.close();
            setTimeout(init, timeout);
        }
        const { hostname, port } = location;
        const protocol = getSocketProtocol(options.assetPrefix || "");
        const assetPrefix = options.assetPrefix.replace(/^\/+/, "");
        let url = `${protocol}://${hostname}:${port}${assetPrefix ? `/${assetPrefix}` : ""}`;
        if (assetPrefix.startsWith("http")) {
            url = `${protocol}://${assetPrefix.split("://")[1]}`;
        }
        source = new window.WebSocket(`${url}${options.path}`);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onmessage = handleMessage;
    }
    init();
}
}}),
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_esm__({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
var __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)");
;
function connect({ // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
addMessageListener = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["addMessageListener"], // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"], onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    // TODO(WEB-1465) Remove this backwards compat fallback once
    // vercel/next.js#54586 is merged.
    if (callback === undefined) {
        callback = sendMessage;
        sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"];
    }
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/app/constants/movies.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("[{\"id\":0,\"title\":\"Deadpool\",\"Category\":[\"Action\",\"Comedy\"],\"release\":2016,\"Director\":\"Tim Miller\",\"Rating\":8.0,\"image\":\"/movie-images/deadpool.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Based upon Marvel Comics' most unconventional anti-hero, DEADPOOL tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.\"},{\"id\":1,\"title\":\"Iron Man 2\",\"Category\":[\"Action\",\"Adventure\",\"Sci-Fi\"],\"release\":2010,\"Director\":\"Jon Favreau\",\"Rating\":7.0,\"image\":\"/movie-images/ironman.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"With the world now aware that he is Iron Man, Robert Downey Jr. returns as the iconic superhero, Tony Stark, in Iron Man 2. Now, Tony must forge new alliances and confront powerful enemies as his own legacy and the future of Earth hang in the balance.\"},{\"id\":2,\"title\":\"Tron: Legacy\",\"Category\":[\"Action\",\"Sci-Fi\",\"Adventure\"],\"release\":2010,\"Director\":\"Joseph Kosinski\",\"Rating\":7.9,\"image\":\"/movie-images/tron.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Sam Flynn, the tech-savvy 27-year-old son of Kevin Flynn, looks into his father's disappearance and finds himself pulled into the same world of fierce programs and gladiatorial games where his father has been living for 20 years.\"},{\"id\":3,\"title\":\"Fast & Furious\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2019,\"Director\":\"David Leitch\",\"Rating\":6.5,\"image\":\"/movie-images/fast.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Ever since hulking lawman Hobbs (Johnson), a loyal agent of America's Diplomatic Security Service, and lawless outcast Shaw (Statham), a former British military elite operative, first faced off in 2015’s Furious 7, the duo have swapped slurs and body blows as they’ve tried to take each other down. But when cybernetically enhanced anarchist Brixton (Idris Elba) gains control of a devastating bio-threat, and a brilliant, fearless MI6 agent (Vanessa Kirby) who happens to be Shaw’s sister joins forces with Hobbs, these two sworn enemies must partner up to stop the only guy who might be even badder than themselves.\"},{\"id\":4,\"title\":\"Spectre\",\"Category\":[\"Action\",\"Adventure\",\"Thriller\"],\"release\":2015,\"Director\":\"Sam Mendes\",\"Rating\":6.8,\"image\":\"/movie-images/daniel.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"A cryptic message from James Bond's past sends him on a trail to Mexico City and Rome, where he meets the beautiful Lucia Sciarra, the widow of an infamous criminal. Bond infiltrates a secret meeting and uncovers the existence of a sinister organisation known as Spectre.\"},{\"id\":5,\"title\":\"Transformers One\",\"Category\":[\"Action\",\"Sci-Fi\"],\"release\":2024,\"Director\":\"Josh Cooley\",\"Rating\":8.7,\"image\":\"/movie-images/transformers.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Transformers One is an upcoming American animated science fiction action film directed by Josh Cooley and written by Andrew Barrer, Gabriel Ferrari, and Steve Desmond. The film will explore the relationship between Optimus Prime and Megatron.\"},{\"id\":6,\"title\":\"How to Train Your Dragon\",\"Category\":[\"Animation\",\"Adventure\",\"Fantasy\"],\"release\":2010,\"Director\":\"Dean DeBlois, Chris Sanders\",\"Rating\":8.1,\"image\":\"/movie-images/dragon.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"In the mythical land of Berk, a young Viking named Hiccup aspires to follow his tribe's tradition of becoming a dragon slayer. When he captures his first dragon, a rare and fearsome Night Fury, he instead forms an unlikely friendship with him, and learns that there is more to the creatures than he ever imagined.\"},{\"id\":7,\"title\":\"The Karate Kid\",\"Category\":[\"Action\",\"Drama\",\"Family\"],\"release\":2010,\"Director\":\"Harald Zwart\",\"Rating\":6.2,\"image\":\"/movie-images/jackiechan.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"Dre Parker, a 12-year-old boy from Detroit, moves to China with his mother and finds himself in conflict with a local bully. He befriends an aging maintenance man, Mr. Han, who is secretly a kung fu master, and learns the art of self-defense.\"},{\"id\":8,\"title\":\"John Wick\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2014,\"Director\":\"Chad Stahelski\",\"Rating\":7.4,\"image\":\"/movie-images/john_wick.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"John Wick, a retired hitman, seeks vengeance after his wife dies and his beloved dog, a final gift from her, is killed during a home invasion. His quest takes him back into the criminal underworld he had left behind, where he faces off against a powerful Russian mobster and his henchmen.\"},{\"id\":0,\"title\":\"Deadpool\",\"Category\":[\"Action\",\"Comedy\"],\"release\":2016,\"Director\":\"Tim Miller\",\"Rating\":8.0,\"image\":\"/movie-images/deadpool.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Based upon Marvel Comics' most unconventional anti-hero, DEADPOOL tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.\"},{\"id\":1,\"title\":\"Iron Man 2\",\"Category\":[\"Action\",\"Adventure\",\"Sci-Fi\"],\"release\":2010,\"Director\":\"Jon Favreau\",\"Rating\":7.0,\"image\":\"/movie-images/ironman.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"With the world now aware that he is Iron Man, Robert Downey Jr. returns as the iconic superhero, Tony Stark, in Iron Man 2. Now, Tony must forge new alliances and confront powerful enemies as his own legacy and the future of Earth hang in the balance.\"},{\"id\":2,\"title\":\"Tron: Legacy\",\"Category\":[\"Action\",\"Sci-Fi\",\"Adventure\"],\"release\":2010,\"Director\":\"Joseph Kosinski\",\"Rating\":7.9,\"image\":\"/movie-images/tron.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Sam Flynn, the tech-savvy 27-year-old son of Kevin Flynn, looks into his father's disappearance and finds himself pulled into the same world of fierce programs and gladiatorial games where his father has been living for 20 years.\"},{\"id\":3,\"title\":\"Fast & Furious\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2019,\"Director\":\"David Leitch\",\"Rating\":6.5,\"image\":\"/movie-images/fast.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Ever since hulking lawman Hobbs (Johnson), a loyal agent of America's Diplomatic Security Service, and lawless outcast Shaw (Statham), a former British military elite operative, first faced off in 2015’s Furious 7, the duo have swapped slurs and body blows as they’ve tried to take each other down. But when cybernetically enhanced anarchist Brixton (Idris Elba) gains control of a devastating bio-threat, and a brilliant, fearless MI6 agent (Vanessa Kirby) who happens to be Shaw’s sister joins forces with Hobbs, these two sworn enemies must partner up to stop the only guy who might be even badder than themselves.\"},{\"id\":4,\"title\":\"Spectre\",\"Category\":[\"Action\",\"Adventure\",\"Thriller\"],\"release\":2015,\"Director\":\"Sam Mendes\",\"Rating\":6.8,\"image\":\"/movie-images/daniel.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"A cryptic message from James Bond's past sends him on a trail to Mexico City and Rome, where he meets the beautiful Lucia Sciarra, the widow of an infamous criminal. Bond infiltrates a secret meeting and uncovers the existence of a sinister organisation known as Spectre.\"},{\"id\":5,\"title\":\"Transformers One\",\"Category\":[\"Action\",\"Sci-Fi\"],\"release\":2024,\"Director\":\"Josh Cooley\",\"Rating\":8.7,\"image\":\"/movie-images/transformers.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Transformers One is an upcoming American animated science fiction action film directed by Josh Cooley and written by Andrew Barrer, Gabriel Ferrari, and Steve Desmond. The film will explore the relationship between Optimus Prime and Megatron.\"},{\"id\":6,\"title\":\"How to Train Your Dragon\",\"Category\":[\"Animation\",\"Adventure\",\"Fantasy\"],\"release\":2010,\"Director\":\"Dean DeBlois, Chris Sanders\",\"Rating\":8.1,\"image\":\"/movie-images/dragon.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"In the mythical land of Berk, a young Viking named Hiccup aspires to follow his tribe's tradition of becoming a dragon slayer. When he captures his first dragon, a rare and fearsome Night Fury, he instead forms an unlikely friendship with him, and learns that there is more to the creatures than he ever imagined.\"},{\"id\":7,\"title\":\"The Karate Kid\",\"Category\":[\"Action\",\"Drama\",\"Family\"],\"release\":2010,\"Director\":\"Harald Zwart\",\"Rating\":6.2,\"image\":\"/movie-images/jackiechan.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"Dre Parker, a 12-year-old boy from Detroit, moves to China with his mother and finds himself in conflict with a local bully. He befriends an aging maintenance man, Mr. Han, who is secretly a kung fu master, and learns the art of self-defense.\"},{\"id\":8,\"title\":\"John Wick\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2014,\"Director\":\"Chad Stahelski\",\"Rating\":7.4,\"image\":\"/movie-images/john_wick.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"John Wick, a retired hitman, seeks vengeance after his wife dies and his beloved dog, a final gift from her, is killed during a home invasion. His quest takes him back into the criminal underworld he had left behind, where he faces off against a powerful Russian mobster and his henchmen.\"},{\"id\":0,\"title\":\"Deadpool\",\"Category\":[\"Action\",\"Comedy\"],\"release\":2016,\"Director\":\"Tim Miller\",\"Rating\":8.0,\"image\":\"/movie-images/deadpool.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Based upon Marvel Comics' most unconventional anti-hero, DEADPOOL tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.\"},{\"id\":1,\"title\":\"Iron Man 2\",\"Category\":[\"Action\",\"Adventure\",\"Sci-Fi\"],\"release\":2010,\"Director\":\"Jon Favreau\",\"Rating\":7.0,\"image\":\"/movie-images/ironman.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"With the world now aware that he is Iron Man, Robert Downey Jr. returns as the iconic superhero, Tony Stark, in Iron Man 2. Now, Tony must forge new alliances and confront powerful enemies as his own legacy and the future of Earth hang in the balance.\"},{\"id\":2,\"title\":\"Tron: Legacy\",\"Category\":[\"Action\",\"Sci-Fi\",\"Adventure\"],\"release\":2010,\"Director\":\"Joseph Kosinski\",\"Rating\":7.9,\"image\":\"/movie-images/tron.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Sam Flynn, the tech-savvy 27-year-old son of Kevin Flynn, looks into his father's disappearance and finds himself pulled into the same world of fierce programs and gladiatorial games where his father has been living for 20 years.\"},{\"id\":3,\"title\":\"Fast & Furious\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2019,\"Director\":\"David Leitch\",\"Rating\":6.5,\"image\":\"/movie-images/fast.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Ever since hulking lawman Hobbs (Johnson), a loyal agent of America's Diplomatic Security Service, and lawless outcast Shaw (Statham), a former British military elite operative, first faced off in 2015’s Furious 7, the duo have swapped slurs and body blows as they’ve tried to take each other down. But when cybernetically enhanced anarchist Brixton (Idris Elba) gains control of a devastating bio-threat, and a brilliant, fearless MI6 agent (Vanessa Kirby) who happens to be Shaw’s sister joins forces with Hobbs, these two sworn enemies must partner up to stop the only guy who might be even badder than themselves.\"},{\"id\":4,\"title\":\"Spectre\",\"Category\":[\"Action\",\"Adventure\",\"Thriller\"],\"release\":2015,\"Director\":\"Sam Mendes\",\"Rating\":6.8,\"image\":\"/movie-images/daniel.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"A cryptic message from James Bond's past sends him on a trail to Mexico City and Rome, where he meets the beautiful Lucia Sciarra, the widow of an infamous criminal. Bond infiltrates a secret meeting and uncovers the existence of a sinister organisation known as Spectre.\"},{\"id\":5,\"title\":\"Transformers One\",\"Category\":[\"Action\",\"Sci-Fi\"],\"release\":2024,\"Director\":\"Josh Cooley\",\"Rating\":8.7,\"image\":\"/movie-images/transformers.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Transformers One is an upcoming American animated science fiction action film directed by Josh Cooley and written by Andrew Barrer, Gabriel Ferrari, and Steve Desmond. The film will explore the relationship between Optimus Prime and Megatron.\"},{\"id\":6,\"title\":\"How to Train Your Dragon\",\"Category\":[\"Animation\",\"Adventure\",\"Fantasy\"],\"release\":2010,\"Director\":\"Dean DeBlois, Chris Sanders\",\"Rating\":8.1,\"image\":\"/movie-images/dragon.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"In the mythical land of Berk, a young Viking named Hiccup aspires to follow his tribe's tradition of becoming a dragon slayer. When he captures his first dragon, a rare and fearsome Night Fury, he instead forms an unlikely friendship with him, and learns that there is more to the creatures than he ever imagined.\"},{\"id\":7,\"title\":\"The Karate Kid\",\"Category\":[\"Action\",\"Drama\",\"Family\"],\"release\":2010,\"Director\":\"Harald Zwart\",\"Rating\":6.2,\"image\":\"/movie-images/jackiechan.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"Dre Parker, a 12-year-old boy from Detroit, moves to China with his mother and finds himself in conflict with a local bully. He befriends an aging maintenance man, Mr. Han, who is secretly a kung fu master, and learns the art of self-defense.\"},{\"id\":8,\"title\":\"John Wick\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2014,\"Director\":\"Chad Stahelski\",\"Rating\":7.4,\"image\":\"/movie-images/john_wick.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"John Wick, a retired hitman, seeks vengeance after his wife dies and his beloved dog, a final gift from her, is killed during a home invasion. His quest takes him back into the criminal underworld he had left behind, where he faces off against a powerful Russian mobster and his henchmen.\"},{\"id\":0,\"title\":\"Deadpool\",\"Category\":[\"Action\",\"Comedy\"],\"release\":2016,\"Director\":\"Tim Miller\",\"Rating\":8.0,\"image\":\"/movie-images/deadpool.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Based upon Marvel Comics' most unconventional anti-hero, DEADPOOL tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.\"},{\"id\":1,\"title\":\"Iron Man 2\",\"Category\":[\"Action\",\"Adventure\",\"Sci-Fi\"],\"release\":2010,\"Director\":\"Jon Favreau\",\"Rating\":7.0,\"image\":\"/movie-images/ironman.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"With the world now aware that he is Iron Man, Robert Downey Jr. returns as the iconic superhero, Tony Stark, in Iron Man 2. Now, Tony must forge new alliances and confront powerful enemies as his own legacy and the future of Earth hang in the balance.\"},{\"id\":2,\"title\":\"Tron: Legacy\",\"Category\":[\"Action\",\"Sci-Fi\",\"Adventure\"],\"release\":2010,\"Director\":\"Joseph Kosinski\",\"Rating\":7.9,\"image\":\"/movie-images/tron.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Sam Flynn, the tech-savvy 27-year-old son of Kevin Flynn, looks into his father's disappearance and finds himself pulled into the same world of fierce programs and gladiatorial games where his father has been living for 20 years.\"},{\"id\":3,\"title\":\"Fast & Furious\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2019,\"Director\":\"David Leitch\",\"Rating\":6.5,\"image\":\"/movie-images/fast.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Ever since hulking lawman Hobbs (Johnson), a loyal agent of America's Diplomatic Security Service, and lawless outcast Shaw (Statham), a former British military elite operative, first faced off in 2015’s Furious 7, the duo have swapped slurs and body blows as they’ve tried to take each other down. But when cybernetically enhanced anarchist Brixton (Idris Elba) gains control of a devastating bio-threat, and a brilliant, fearless MI6 agent (Vanessa Kirby) who happens to be Shaw’s sister joins forces with Hobbs, these two sworn enemies must partner up to stop the only guy who might be even badder than themselves.\"},{\"id\":4,\"title\":\"Spectre\",\"Category\":[\"Action\",\"Adventure\",\"Thriller\"],\"release\":2015,\"Director\":\"Sam Mendes\",\"Rating\":6.8,\"image\":\"/movie-images/daniel.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"A cryptic message from James Bond's past sends him on a trail to Mexico City and Rome, where he meets the beautiful Lucia Sciarra, the widow of an infamous criminal. Bond infiltrates a secret meeting and uncovers the existence of a sinister organisation known as Spectre.\"},{\"id\":5,\"title\":\"Transformers One\",\"Category\":[\"Action\",\"Sci-Fi\"],\"release\":2024,\"Director\":\"Josh Cooley\",\"Rating\":8.7,\"image\":\"/movie-images/transformers.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Transformers One is an upcoming American animated science fiction action film directed by Josh Cooley and written by Andrew Barrer, Gabriel Ferrari, and Steve Desmond. The film will explore the relationship between Optimus Prime and Megatron.\"},{\"id\":6,\"title\":\"How to Train Your Dragon\",\"Category\":[\"Animation\",\"Adventure\",\"Fantasy\"],\"release\":2010,\"Director\":\"Dean DeBlois, Chris Sanders\",\"Rating\":8.1,\"image\":\"/movie-images/dragon.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"In the mythical land of Berk, a young Viking named Hiccup aspires to follow his tribe's tradition of becoming a dragon slayer. When he captures his first dragon, a rare and fearsome Night Fury, he instead forms an unlikely friendship with him, and learns that there is more to the creatures than he ever imagined.\"},{\"id\":7,\"title\":\"The Karate Kid\",\"Category\":[\"Action\",\"Drama\",\"Family\"],\"release\":2010,\"Director\":\"Harald Zwart\",\"Rating\":6.2,\"image\":\"/movie-images/jackiechan.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"Dre Parker, a 12-year-old boy from Detroit, moves to China with his mother and finds himself in conflict with a local bully. He befriends an aging maintenance man, Mr. Han, who is secretly a kung fu master, and learns the art of self-defense.\"},{\"id\":8,\"title\":\"John Wick\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2014,\"Director\":\"Chad Stahelski\",\"Rating\":7.4,\"image\":\"/movie-images/john_wick.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"John Wick, a retired hitman, seeks vengeance after his wife dies and his beloved dog, a final gift from her, is killed during a home invasion. His quest takes him back into the criminal underworld he had left behind, where he faces off against a powerful Russian mobster and his henchmen.\"},{\"id\":4,\"title\":\"Skyfall\",\"Category\":[\"Action\",\"Adventure\",\"Thriller\"],\"release\":2012,\"Director\":\"Sam Mendes\",\"Rating\":7.7,\"image\":\"/movie-images/daniel.jpg\",\"youtube\":\"https://youtu.be/xPzLkPMmIcA\",\"description\":\"James Bond uncovers a dark and dangerous secret from his past that puts the world in jeopardy. As the threat escalates, Bond must confront new enemies, including the elusive Silva, who seeks to destroy M.\"},{\"id\":5,\"title\":\"Transformers: Rise of the Beasts\",\"Category\":[\"Action\",\"Sci-Fi\",\"Adventure\"],\"release\":2023,\"Director\":\"Steven Caple Jr.\",\"Rating\":7.3,\"image\":\"/movie-images/transformers.jpg\",\"youtube\":\"https://youtu.be/7pY3n3Uvv8I\",\"description\":\"Optimus Prime and the Autobots face off against new threats, including the villainous Unicron, while an unlikely alliance with the Maximals leads to an all-out battle for Earth's future.\"},{\"id\":6,\"title\":\"Shrek\",\"Category\":[\"Animation\",\"Comedy\",\"Fantasy\"],\"release\":2001,\"Director\":\"Andrew Adamson, Vicky Jenson\",\"Rating\":8.0,\"image\":\"/movie-images/dragon.jpg\",\"youtube\":\"https://youtu.be/8J5bZ47udJw\",\"description\":\"Shrek, a reclusive ogre, embarks on a journey to rescue Princess Fiona with the help of his talkative donkey friend, only to discover that love and friendship can change even the most unlikely of heroes.\"},{\"id\":7,\"title\":\"Kung Fu Panda\",\"Category\":[\"Animation\",\"Action\",\"Comedy\"],\"release\":2008,\"Director\":\"John Stevenson, Mark Osborne\",\"Rating\":7.6,\"image\":\"/movie-images/jackiechan.jpg\",\"youtube\":\"https://youtu.be/Pp8DfpAzz3s\",\"description\":\"Po, a lazy panda, becomes an unlikely kung fu master when he is chosen to defend the Valley of Peace from an evil snow leopard. With the help of his fellow masters, he discovers the true meaning of strength.\"},{\"id\":8,\"title\":\"John Wick: Chapter 2\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2017,\"Director\":\"Chad Stahelski\",\"Rating\":7.5,\"image\":\"/movie-images/john_wick.jpg\",\"youtube\":\"https://youtu.be/mQazs3DzHtI\",\"description\":\"John Wick's quest for vengeance leads him into the world of international crime. As he battles against enemies seeking to claim his life, he uncovers secrets about the criminal underworld and his own past.\"},{\"id\":0,\"title\":\"Deadpool 2\",\"Category\":[\"Action\",\"Comedy\",\"Superhero\"],\"release\":2018,\"Director\":\"David Leitch\",\"Rating\":7.7,\"image\":\"/movie-images/deadpool.jpg\",\"youtube\":\"https://youtu.be/Z9YpPSh7ezM\",\"description\":\"Deadpool returns in this thrilling sequel, where he teams up with a team of misfits to protect a young mutant from a time-traveling mercenary, all while dealing with his chaotic personal life.\"},{\"id\":1,\"title\":\"Iron Man 3\",\"Category\":[\"Action\",\"Adventure\",\"Sci-Fi\"],\"release\":2013,\"Director\":\"Shane Black\",\"Rating\":7.2,\"image\":\"/movie-images/ironman.jpg\",\"youtube\":\"https://youtu.be/NuY4Hz5RPb0\",\"description\":\"Tony Stark struggles with PTSD after the events of The Avengers. When a new enemy known as the Mandarin emerges, Stark must confront his greatest fears and rely on his intellect and new technology to save the day.\"},{\"id\":2,\"title\":\"Blade Runner 2049\",\"Category\":[\"Action\",\"Sci-Fi\",\"Thriller\"],\"release\":2017,\"Director\":\"Denis Villeneuve\",\"Rating\":8.0,\"image\":\"/movie-images/tron.jpg\",\"youtube\":\"https://youtu.be/4vAvfHL7Ne8\",\"description\":\"A young blade runner named K uncovers a long-buried secret that could alter the course of humanity. He embarks on a journey to find the original Blade Runner, Rick Deckard, who has been missing for decades.\"},{\"id\":3,\"title\":\"Fast & Furious 7\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2015,\"Director\":\"James Wan\",\"Rating\":7.1,\"image\":\"/movie-images/fast.jpg\",\"youtube\":\"https://youtu.be/4Ko9T2VQ0xQ\",\"description\":\"Dominic Toretto and his team face off against a dangerous foe seeking revenge, while dealing with the loss of one of their own. The stakes are higher than ever as the family comes together for one final ride.\"},{\"id\":0,\"title\":\"Deadpool\",\"Category\":[\"Action\",\"Comedy\"],\"release\":2016,\"Director\":\"Tim Miller\",\"Rating\":8.0,\"image\":\"/movie-images/deadpool.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Based upon Marvel Comics' most unconventional anti-hero, DEADPOOL tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.\"},{\"id\":1,\"title\":\"Iron Man 2\",\"Category\":[\"Action\",\"Adventure\",\"Sci-Fi\"],\"release\":2010,\"Director\":\"Jon Favreau\",\"Rating\":7.0,\"image\":\"/movie-images/ironman.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"With the world now aware that he is Iron Man, Robert Downey Jr. returns as the iconic superhero, Tony Stark, in Iron Man 2. Now, Tony must forge new alliances and confront powerful enemies as his own legacy and the future of Earth hang in the balance.\"},{\"id\":2,\"title\":\"Tron: Legacy\",\"Category\":[\"Action\",\"Sci-Fi\",\"Adventure\"],\"release\":2010,\"Director\":\"Joseph Kosinski\",\"Rating\":7.9,\"image\":\"/movie-images/tron.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Sam Flynn, the tech-savvy 27-year-old son of Kevin Flynn, looks into his father's disappearance and finds himself pulled into the same world of fierce programs and gladiatorial games where his father has been living for 20 years.\"},{\"id\":3,\"title\":\"Fast & Furious\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2019,\"Director\":\"David Leitch\",\"Rating\":6.5,\"image\":\"/movie-images/fast.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Ever since hulking lawman Hobbs (Johnson), a loyal agent of America's Diplomatic Security Service, and lawless outcast Shaw (Statham), a former British military elite operative, first faced off in 2015’s Furious 7, the duo have swapped slurs and body blows as they’ve tried to take each other down. But when cybernetically enhanced anarchist Brixton (Idris Elba) gains control of a devastating bio-threat, and a brilliant, fearless MI6 agent (Vanessa Kirby) who happens to be Shaw’s sister joins forces with Hobbs, these two sworn enemies must partner up to stop the only guy who might be even badder than themselves.\"},{\"id\":4,\"title\":\"Spectre\",\"Category\":[\"Action\",\"Adventure\",\"Thriller\"],\"release\":2015,\"Director\":\"Sam Mendes\",\"Rating\":6.8,\"image\":\"/movie-images/daniel.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"A cryptic message from James Bond's past sends him on a trail to Mexico City and Rome, where he meets the beautiful Lucia Sciarra, the widow of an infamous criminal. Bond infiltrates a secret meeting and uncovers the existence of a sinister organisation known as Spectre.\"},{\"id\":5,\"title\":\"Transformers One\",\"Category\":[\"Action\",\"Sci-Fi\"],\"release\":2024,\"Director\":\"Josh Cooley\",\"Rating\":8.7,\"image\":\"/movie-images/transformers.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Transformers One is an upcoming American animated science fiction action film directed by Josh Cooley and written by Andrew Barrer, Gabriel Ferrari, and Steve Desmond. The film will explore the relationship between Optimus Prime and Megatron.\"},{\"id\":6,\"title\":\"How to Train Your Dragon\",\"Category\":[\"Animation\",\"Adventure\",\"Fantasy\"],\"release\":2010,\"Director\":\"Dean DeBlois, Chris Sanders\",\"Rating\":8.1,\"image\":\"/movie-images/dragon.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"In the mythical land of Berk, a young Viking named Hiccup aspires to follow his tribe's tradition of becoming a dragon slayer. When he captures his first dragon, a rare and fearsome Night Fury, he instead forms an unlikely friendship with him, and learns that there is more to the creatures than he ever imagined.\"},{\"id\":7,\"title\":\"The Karate Kid\",\"Category\":[\"Action\",\"Drama\",\"Family\"],\"release\":2010,\"Director\":\"Harald Zwart\",\"Rating\":6.2,\"image\":\"/movie-images/jackiechan.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"Dre Parker, a 12-year-old boy from Detroit, moves to China with his mother and finds himself in conflict with a local bully. He befriends an aging maintenance man, Mr. Han, who is secretly a kung fu master, and learns the art of self-defense.\"},{\"id\":8,\"title\":\"John Wick\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2014,\"Director\":\"Chad Stahelski\",\"Rating\":7.4,\"image\":\"/movie-images/john_wick.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"John Wick, a retired hitman, seeks vengeance after his wife dies and his beloved dog, a final gift from her, is killed during a home invasion. His quest takes him back into the criminal underworld he had left behind, where he faces off against a powerful Russian mobster and his henchmen.\"},{\"id\":4,\"title\":\"Skyfall\",\"Category\":[\"Action\",\"Adventure\",\"Thriller\"],\"release\":2012,\"Director\":\"Sam Mendes\",\"Rating\":7.7,\"image\":\"/movie-images/daniel.jpg\",\"youtube\":\"https://youtu.be/xPzLkPMmIcA\",\"description\":\"James Bond uncovers a dark and dangerous secret from his past that puts the world in jeopardy. As the threat escalates, Bond must confront new enemies, including the elusive Silva, who seeks to destroy M.\"},{\"id\":5,\"title\":\"Transformers: Rise of the Beasts\",\"Category\":[\"Action\",\"Sci-Fi\",\"Adventure\"],\"release\":2023,\"Director\":\"Steven Caple Jr.\",\"Rating\":7.3,\"image\":\"/movie-images/transformers.jpg\",\"youtube\":\"https://youtu.be/7pY3n3Uvv8I\",\"description\":\"Optimus Prime and the Autobots face off against new threats, including the villainous Unicron, while an unlikely alliance with the Maximals leads to an all-out battle for Earth's future.\"},{\"id\":6,\"title\":\"Shrek\",\"Category\":[\"Animation\",\"Comedy\",\"Fantasy\"],\"release\":2001,\"Director\":\"Andrew Adamson, Vicky Jenson\",\"Rating\":8.0,\"image\":\"/movie-images/dragon.jpg\",\"youtube\":\"https://youtu.be/8J5bZ47udJw\",\"description\":\"Shrek, a reclusive ogre, embarks on a journey to rescue Princess Fiona with the help of his talkative donkey friend, only to discover that love and friendship can change even the most unlikely of heroes.\"},{\"id\":7,\"title\":\"Kung Fu Panda\",\"Category\":[\"Animation\",\"Action\",\"Comedy\"],\"release\":2008,\"Director\":\"John Stevenson, Mark Osborne\",\"Rating\":7.6,\"image\":\"/movie-images/jackiechan.jpg\",\"youtube\":\"https://youtu.be/Pp8DfpAzz3s\",\"description\":\"Po, a lazy panda, becomes an unlikely kung fu master when he is chosen to defend the Valley of Peace from an evil snow leopard. With the help of his fellow masters, he discovers the true meaning of strength.\"},{\"id\":8,\"title\":\"John Wick: Chapter 2\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2017,\"Director\":\"Chad Stahelski\",\"Rating\":7.5,\"image\":\"/movie-images/john_wick.jpg\",\"youtube\":\"https://youtu.be/mQazs3DzHtI\",\"description\":\"John Wick's quest for vengeance leads him into the world of international crime. As he battles against enemies seeking to claim his life, he uncovers secrets about the criminal underworld and his own past.\"},{\"id\":0,\"title\":\"Deadpool 2\",\"Category\":[\"Action\",\"Comedy\",\"Superhero\"],\"release\":2018,\"Director\":\"David Leitch\",\"Rating\":7.7,\"image\":\"/movie-images/deadpool.jpg\",\"youtube\":\"https://youtu.be/Z9YpPSh7ezM\",\"description\":\"Deadpool returns in this thrilling sequel, where he teams up with a team of misfits to protect a young mutant from a time-traveling mercenary, all while dealing with his chaotic personal life.\"},{\"id\":1,\"title\":\"Iron Man 3\",\"Category\":[\"Action\",\"Adventure\",\"Sci-Fi\"],\"release\":2013,\"Director\":\"Shane Black\",\"Rating\":7.2,\"image\":\"/movie-images/ironman.jpg\",\"youtube\":\"https://youtu.be/NuY4Hz5RPb0\",\"description\":\"Tony Stark struggles with PTSD after the events of The Avengers. When a new enemy known as the Mandarin emerges, Stark must confront his greatest fears and rely on his intellect and new technology to save the day.\"},{\"id\":2,\"title\":\"Blade Runner 2049\",\"Category\":[\"Action\",\"Sci-Fi\",\"Thriller\"],\"release\":2017,\"Director\":\"Denis Villeneuve\",\"Rating\":8.0,\"image\":\"/movie-images/tron.jpg\",\"youtube\":\"https://youtu.be/4vAvfHL7Ne8\",\"description\":\"A young blade runner named K uncovers a long-buried secret that could alter the course of humanity. He embarks on a journey to find the original Blade Runner, Rick Deckard, who has been missing for decades.\"},{\"id\":3,\"title\":\"Fast & Furious 7\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2015,\"Director\":\"James Wan\",\"Rating\":7.1,\"image\":\"/movie-images/fast.jpg\",\"youtube\":\"https://youtu.be/4Ko9T2VQ0xQ\",\"description\":\"Dominic Toretto and his team face off against a dangerous foe seeking revenge, while dealing with the loss of one of their own. The stakes are higher than ever as the family comes together for one final ride.\"},{\"id\":0,\"title\":\"Deadpool\",\"Category\":[\"Action\",\"Comedy\"],\"release\":2016,\"Director\":\"Tim Miller\",\"Rating\":8.0,\"image\":\"/movie-images/deadpool.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Based upon Marvel Comics' most unconventional anti-hero, DEADPOOL tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.\"},{\"id\":1,\"title\":\"Iron Man 2\",\"Category\":[\"Action\",\"Adventure\",\"Sci-Fi\"],\"release\":2010,\"Director\":\"Jon Favreau\",\"Rating\":7.0,\"image\":\"/movie-images/ironman.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"With the world now aware that he is Iron Man, Robert Downey Jr. returns as the iconic superhero, Tony Stark, in Iron Man 2. Now, Tony must forge new alliances and confront powerful enemies as his own legacy and the future of Earth hang in the balance.\"},{\"id\":2,\"title\":\"Tron: Legacy\",\"Category\":[\"Action\",\"Sci-Fi\",\"Adventure\"],\"release\":2010,\"Director\":\"Joseph Kosinski\",\"Rating\":7.9,\"image\":\"/movie-images/tron.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Sam Flynn, the tech-savvy 27-year-old son of Kevin Flynn, looks into his father's disappearance and finds himself pulled into the same world of fierce programs and gladiatorial games where his father has been living for 20 years.\"},{\"id\":3,\"title\":\"Fast & Furious\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2019,\"Director\":\"David Leitch\",\"Rating\":6.5,\"image\":\"/movie-images/fast.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"Ever since hulking lawman Hobbs (Johnson), a loyal agent of America's Diplomatic Security Service, and lawless outcast Shaw (Statham), a former British military elite operative, first faced off in 2015’s Furious 7, the duo have swapped slurs and body blows as they’ve tried to take each other down. But when cybernetically enhanced anarchist Brixton (Idris Elba) gains control of a devastating bio-threat, and a brilliant, fearless MI6 agent (Vanessa Kirby) who happens to be Shaw’s sister joins forces with Hobbs, these two sworn enemies must partner up to stop the only guy who might be even badder than themselves.\"},{\"id\":4,\"title\":\"Spectre\",\"Category\":[\"Action\",\"Adventure\",\"Thriller\"],\"release\":2015,\"Director\":\"Sam Mendes\",\"Rating\":6.8,\"image\":\"/movie-images/daniel.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"A cryptic message from James Bond's past sends him on a trail to Mexico City and Rome, where he meets the beautiful Lucia Sciarra, the widow of an infamous criminal. Bond infiltrates a secret meeting and uncovers the existence of a sinister organisation known as Spectre.\"},{\"id\":5,\"title\":\"Transformers One\",\"Category\":[\"Action\",\"Sci-Fi\"],\"release\":2024,\"Director\":\"Josh Cooley\",\"Rating\":8.7,\"image\":\"/movie-images/transformers.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"Transformers One is an upcoming American animated science fiction action film directed by Josh Cooley and written by Andrew Barrer, Gabriel Ferrari, and Steve Desmond. The film will explore the relationship between Optimus Prime and Megatron.\"},{\"id\":6,\"title\":\"How to Train Your Dragon\",\"Category\":[\"Animation\",\"Adventure\",\"Fantasy\"],\"release\":2010,\"Director\":\"Dean DeBlois, Chris Sanders\",\"Rating\":8.1,\"image\":\"/movie-images/dragon.jpg\",\"youtube\":\"https://youtu.be/73_1biulkYk?si=BFkVb4ge2E59mx1R\",\"description\":\"In the mythical land of Berk, a young Viking named Hiccup aspires to follow his tribe's tradition of becoming a dragon slayer. When he captures his first dragon, a rare and fearsome Night Fury, he instead forms an unlikely friendship with him, and learns that there is more to the creatures than he ever imagined.\"},{\"id\":7,\"title\":\"The Karate Kid\",\"Category\":[\"Action\",\"Drama\",\"Family\"],\"release\":2010,\"Director\":\"Harald Zwart\",\"Rating\":6.2,\"image\":\"/movie-images/jackiechan.jpg\",\"youtube\":\"https://youtu.be/EaLUny7r11o?si=YFfkxNFP1oeYfV5u\",\"description\":\"Dre Parker, a 12-year-old boy from Detroit, moves to China with his mother and finds himself in conflict with a local bully. He befriends an aging maintenance man, Mr. Han, who is secretly a kung fu master, and learns the art of self-defense.\"},{\"id\":8,\"title\":\"John Wick\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2014,\"Director\":\"Chad Stahelski\",\"Rating\":7.4,\"image\":\"/movie-images/john_wick.jpg\",\"youtube\":\"https://youtu.be/1pHDWnXmK7Y?si=UUwLmfe0ZQV4L0CB\",\"description\":\"John Wick, a retired hitman, seeks vengeance after his wife dies and his beloved dog, a final gift from her, is killed during a home invasion. His quest takes him back into the criminal underworld he had left behind, where he faces off against a powerful Russian mobster and his henchmen.\"},{\"id\":4,\"title\":\"Skyfall\",\"Category\":[\"Action\",\"Adventure\",\"Thriller\"],\"release\":2012,\"Director\":\"Sam Mendes\",\"Rating\":7.7,\"image\":\"/movie-images/daniel.jpg\",\"youtube\":\"https://youtu.be/xPzLkPMmIcA\",\"description\":\"James Bond uncovers a dark and dangerous secret from his past that puts the world in jeopardy. As the threat escalates, Bond must confront new enemies, including the elusive Silva, who seeks to destroy M.\"},{\"id\":5,\"title\":\"Transformers: Rise of the Beasts\",\"Category\":[\"Action\",\"Sci-Fi\",\"Adventure\"],\"release\":2023,\"Director\":\"Steven Caple Jr.\",\"Rating\":7.3,\"image\":\"/movie-images/transformers.jpg\",\"youtube\":\"https://youtu.be/7pY3n3Uvv8I\",\"description\":\"Optimus Prime and the Autobots face off against new threats, including the villainous Unicron, while an unlikely alliance with the Maximals leads to an all-out battle for Earth's future.\"},{\"id\":6,\"title\":\"Shrek\",\"Category\":[\"Animation\",\"Comedy\",\"Fantasy\"],\"release\":2001,\"Director\":\"Andrew Adamson, Vicky Jenson\",\"Rating\":8.0,\"image\":\"/movie-images/dragon.jpg\",\"youtube\":\"https://youtu.be/8J5bZ47udJw\",\"description\":\"Shrek, a reclusive ogre, embarks on a journey to rescue Princess Fiona with the help of his talkative donkey friend, only to discover that love and friendship can change even the most unlikely of heroes.\"},{\"id\":7,\"title\":\"Kung Fu Panda\",\"Category\":[\"Animation\",\"Action\",\"Comedy\"],\"release\":2008,\"Director\":\"John Stevenson, Mark Osborne\",\"Rating\":7.6,\"image\":\"/movie-images/jackiechan.jpg\",\"youtube\":\"https://youtu.be/Pp8DfpAzz3s\",\"description\":\"Po, a lazy panda, becomes an unlikely kung fu master when he is chosen to defend the Valley of Peace from an evil snow leopard. With the help of his fellow masters, he discovers the true meaning of strength.\"},{\"id\":8,\"title\":\"John Wick: Chapter 2\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2017,\"Director\":\"Chad Stahelski\",\"Rating\":7.5,\"image\":\"/movie-images/john_wick.jpg\",\"youtube\":\"https://youtu.be/mQazs3DzHtI\",\"description\":\"John Wick's quest for vengeance leads him into the world of international crime. As he battles against enemies seeking to claim his life, he uncovers secrets about the criminal underworld and his own past.\"},{\"id\":0,\"title\":\"Deadpool 2\",\"Category\":[\"Action\",\"Comedy\",\"Superhero\"],\"release\":2018,\"Director\":\"David Leitch\",\"Rating\":7.7,\"image\":\"/movie-images/deadpool.jpg\",\"youtube\":\"https://youtu.be/Z9YpPSh7ezM\",\"description\":\"Deadpool returns in this thrilling sequel, where he teams up with a team of misfits to protect a young mutant from a time-traveling mercenary, all while dealing with his chaotic personal life.\"},{\"id\":1,\"title\":\"Iron Man 3\",\"Category\":[\"Action\",\"Adventure\",\"Sci-Fi\"],\"release\":2013,\"Director\":\"Shane Black\",\"Rating\":7.2,\"image\":\"/movie-images/ironman.jpg\",\"youtube\":\"https://youtu.be/NuY4Hz5RPb0\",\"description\":\"Tony Stark struggles with PTSD after the events of The Avengers. When a new enemy known as the Mandarin emerges, Stark must confront his greatest fears and rely on his intellect and new technology to save the day.\"},{\"id\":2,\"title\":\"Blade Runner 2049\",\"Category\":[\"Action\",\"Sci-Fi\",\"Thriller\"],\"release\":2017,\"Director\":\"Denis Villeneuve\",\"Rating\":8.0,\"image\":\"/movie-images/tron.jpg\",\"youtube\":\"https://youtu.be/4vAvfHL7Ne8\",\"description\":\"A young blade runner named K uncovers a long-buried secret that could alter the course of humanity. He embarks on a journey to find the original Blade Runner, Rick Deckard, who has been missing for decades.\"},{\"id\":3,\"title\":\"Fast & Furious 7\",\"Category\":[\"Action\",\"Thriller\"],\"release\":2015,\"Director\":\"James Wan\",\"Rating\":7.1,\"image\":\"/movie-images/fast.jpg\",\"youtube\":\"https://youtu.be/4Ko9T2VQ0xQ\",\"description\":\"Dominic Toretto and his team face off against a dangerous foe seeking revenge, while dealing with the loss of one of their own. The stakes are higher than ever as the family comes together for one final ride.\"}]"));}}),
"[project]/app/constants/catagory.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("[{\"name\":\"All\",\"icon\":\"🔄\"},{\"name\":\"Action\",\"icon\":\"⚔️\"},{\"name\":\"Comedy\",\"icon\":\"😂\"},{\"name\":\"Adventure\",\"icon\":\"🏞️\"},{\"name\":\"Sci-Fi\",\"icon\":\"👽\"},{\"name\":\"Thriller\",\"icon\":\"🕵️‍♂️\"},{\"name\":\"Animation\",\"icon\":\"🎬\"},{\"name\":\"Fantasy\",\"icon\":\"🧙‍♂️\"},{\"name\":\"Drama\",\"icon\":\"🎭\"},{\"name\":\"Family\",\"icon\":\"👪\"},{\"name\":\"Action\",\"icon\":\"⚔️\"},{\"name\":\"Comedy\",\"icon\":\"😂\"},{\"name\":\"Adventure\",\"icon\":\"🏞️\"},{\"name\":\"Sci-Fi\",\"icon\":\"👽\"},{\"name\":\"Thriller\",\"icon\":\"🕵️‍♂️\"},{\"name\":\"Animation\",\"icon\":\"🎬\"},{\"name\":\"Fantasy\",\"icon\":\"🧙‍♂️\"},{\"name\":\"Drama\",\"icon\":\"🎭\"},{\"name\":\"Family\",\"icon\":\"👪\"}]"));}}),
"[project]/app/components/LoaderComp.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
'use client';
;
const LoaderComp = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center items-center min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
        }, void 0, false, {
            fileName: "[project]/app/components/LoaderComp.tsx",
            lineNumber: 10,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/LoaderComp.tsx",
        lineNumber: 9,
        columnNumber: 7
    }, this);
};
_c = LoaderComp;
const __TURBOPACK__default__export__ = LoaderComp;
var _c;
__turbopack_refresh__.register(_c, "LoaderComp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/images/star.png [client] (static)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__("/_next/static/media/star.f34bc7f2.png");}}),
"[project]/public/images/star.png.mjs { IMAGE => \"[project]/public/images/star.png [client] (static)\" } [client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$star$2e$png__$5b$client$5d$__$28$static$29$__ = __turbopack_import__("[project]/public/images/star.png [client] (static)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$star$2e$png__$5b$client$5d$__$28$static$29$__["default"],
    width: 32,
    height: 32,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAxElEQVR42l2NuwrCQBBFZzf7+AJLCx9YWivYKWms7MTGOpBCbexEsAuCVT7BCL5KQRuVtPoF6cwvaLSIxp2QWDhw4HDv7A5AMpwBtXvMsPvMQIf/KWVJxpsL13OEi/4rOg2tPuqy9nbCrPAo74oHOmbYgb8R++gsA8VbESWgB/5aHECvkoJrc+dzkmG6gK6yhV4hxfiM2dKa+HW6gI5ZXGoUyMxkA/XqdVuJq+Ki/IkZdiA50OWYD3cWn9bKNK/IoWOG3RekPV1IaWULeQAAAABJRU5ErkJggg==",
    blurWidth: 8,
    blurHeight: 8
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/MovieCard.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$star$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$star$2e$png__$5b$client$5d$__$28$static$2922$__$7d$__$5b$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_import__('[project]/public/images/star.png.mjs { IMAGE => "[project]/public/images/star.png [client] (static)" } [client] (structured image object, ecmascript)');
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
const MovieCard = ({ data })=>{
    _s();
    const { title, id, Category, Rating } = data;
    const route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const CardClickFun = (id)=>{
        route.push(`movie/${id}`);
    // console.log("Card clicked",id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: ()=>CardClickFun(id),
            className: "border-y-4 flex flex-col justify-center items-center bg-slate-100 gap-3 md:max-w-96 p-4 hover:text-yellow-500",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    src: data.image,
                    width: 200,
                    height: 200,
                    alt: title,
                    className: "object-cover w-[200px] h-[200px] rounded-lg m-2 cursor-pointer hover:scale-[1.01]"
                }, void 0, false, {
                    fileName: "[project]/app/components/MovieCard.tsx",
                    lineNumber: 35,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-start m-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$star$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$star$2e$png__$5b$client$5d$__$28$static$2922$__$7d$__$5b$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                            alt: "Star image",
                            height: 20,
                            width: 20
                        }, void 0, false, {
                            fileName: "[project]/app/components/MovieCard.tsx",
                            lineNumber: 43,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg m-2",
                            children: [
                                " ",
                                Rating,
                                " "
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MovieCard.tsx",
                            lineNumber: 44,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/MovieCard.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "font-bold text-lg",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/app/components/MovieCard.tsx",
                    lineNumber: 46,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                    className: "flex gap-2 p-4",
                    children: Category.map((ele, index1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "bg-slate-200 p-2 text-base font-bold",
                            children: ele
                        }, index1, false, {
                            fileName: "[project]/app/components/MovieCard.tsx",
                            lineNumber: 49,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/MovieCard.tsx",
                    lineNumber: 47,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/MovieCard.tsx",
            lineNumber: 33,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/MovieCard.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
};
_s(MovieCard, "JD5qVJBo0MNDbUb5oI+DMKChels=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = MovieCard;
const __TURBOPACK__default__export__ = MovieCard;
var _c;
__turbopack_refresh__.register(_c, "MovieCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/images/back.png [client] (static)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__("/_next/static/media/back.c0825a8b.png");}}),
"[project]/public/images/back.png.mjs { IMAGE => \"[project]/public/images/back.png [client] (static)\" } [client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$back$2e$png__$5b$client$5d$__$28$static$29$__ = __turbopack_import__("[project]/public/images/back.png [client] (static)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$back$2e$png__$5b$client$5d$__$28$static$29$__["default"],
    width: 64,
    height: 64,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAR0lEQVR42o3PuwkAIAwE0Fg4gGPoBi5hZ2Fp5Rxu5mheIShyfg5elYMkIjNqoNEQwJ2GCSoYVsjQoEDc+K/Cc8V6pJVL6Jsdu84JCLCzhDMAAAAASUVORK5CYII=",
    blurWidth: 8,
    blurHeight: 8
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/images/right-arrow.png [client] (static)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__("/_next/static/media/right-arrow.db5a5ee0.png");}}),
"[project]/public/images/right-arrow.png.mjs { IMAGE => \"[project]/public/images/right-arrow.png [client] (static)\" } [client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$right$2d$arrow$2e$png__$5b$client$5d$__$28$static$29$__ = __turbopack_import__("[project]/public/images/right-arrow.png [client] (static)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$right$2d$arrow$2e$png__$5b$client$5d$__$28$static$29$__["default"],
    width: 64,
    height: 64,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAASUlEQVR42o3OuwkAIAwE0FiLhY1OqCv4mUDB6ZzIEywENRh4TXKQIzrHgqTHCHCQuJCGChnUXPiLAB3aV+D2oqwe6lUyciXNfhz2igv9liGU6gAAAABJRU5ErkJggg==",
    blurWidth: 8,
    blurHeight: 8
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/Pagination.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$back$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$back$2e$png__$5b$client$5d$__$28$static$2922$__$7d$__$5b$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_import__('[project]/public/images/back.png.mjs { IMAGE => "[project]/public/images/back.png [client] (static)" } [client] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$right$2d$arrow$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$right$2d$arrow$2e$png__$5b$client$5d$__$28$static$2922$__$7d$__$5b$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_import__('[project]/public/images/right-arrow.png.mjs { IMAGE => "[project]/public/images/right-arrow.png [client] (static)" } [client] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [client] (ecmascript)");
'use client';
;
;
;
;
const Pagination = ({ length, currentPage, setCurrentPage })=>{
    const page = [];
    const totalPages = Math.ceil(length / 12);
    for(let i = 1; i <= totalPages; i++){
        page.push(i);
    }
    const handlePageChange = (pageNumber)=>{
        setCurrentPage(pageNumber);
    };
    const handleLeftPage = ()=>{
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleRightPage = ()=>{
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full bottom-0 p-6 px-52 gap-3 justify-center flex items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$back$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$back$2e$png__$5b$client$5d$__$28$static$2922$__$7d$__$5b$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                alt: "left Image",
                width: 35,
                height: 35,
                onClick: handleLeftPage
            }, void 0, false, {
                fileName: "[project]/app/components/Pagination.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this),
            page.map((pg, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>handlePageChange(pg),
                    className: `px-3 py-2 ${currentPage === pg ? 'bg-blue-500 text-white' : 'bg-gray-200'}`,
                    children: pg
                }, index, false, {
                    fileName: "[project]/app/components/Pagination.tsx",
                    lineNumber: 39,
                    columnNumber: 21
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$right$2d$arrow$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$right$2d$arrow$2e$png__$5b$client$5d$__$28$static$2922$__$7d$__$5b$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                alt: "right Image",
                width: 35,
                height: 35,
                onClick: handleRightPage
            }, void 0, false, {
                fileName: "[project]/app/components/Pagination.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Pagination.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
};
_c = Pagination;
const __TURBOPACK__default__export__ = Pagination;
var _c;
__turbopack_refresh__.register(_c, "Pagination");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/images/logo.png [client] (static)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__("/_next/static/media/logo.456f73aa.png");}}),
"[project]/public/images/logo.png.mjs { IMAGE => \"[project]/public/images/logo.png [client] (static)\" } [client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$logo$2e$png__$5b$client$5d$__$28$static$29$__ = __turbopack_import__("[project]/public/images/logo.png [client] (static)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$logo$2e$png__$5b$client$5d$__$28$static$29$__["default"],
    width: 187,
    height: 184,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABCUlEQVR42k3PPUvDQByA8bv87yWXs2py0QZqX6WN1lpqrUGU+lKpWiioESwiTlXBQd0EQRFcBKEQ0MFBhy6C4CBdXNz0g7lY2mf9TQ9C/2Fm2OC4O5DI5tlFq6WFLBP1oSLZ9Wcy43e04dEY9Wp1UT0PIJwuIAxUksnqE/UOfsAcK/HcxiFxMkVW2nvQy8dvCBMeosXdtqhdfYEVTYuV00D6999gJ2e1AZVA2mDYBTM6bdSvP4zNyzYMOXGxdvbOvf0OZkIhvtB8ZYtHL2QklWOZ8jao2Dyfa/wydzXAwCQCMzKuL5/c6Ut+A+xIihW2PulE5RFTvXehCWnI5s0tSU7lQcUrmAqra3/dDipBk/KErwAAAABJRU5ErkJggg==",
    blurWidth: 8,
    blurHeight: 8
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/images/search.png [client] (static)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__("/_next/static/media/search.fd4eaca6.png");}}),
"[project]/public/images/search.png.mjs { IMAGE => \"[project]/public/images/search.png [client] (static)\" } [client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$search$2e$png__$5b$client$5d$__$28$static$29$__ = __turbopack_import__("[project]/public/images/search.png [client] (static)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$search$2e$png__$5b$client$5d$__$28$static$29$__["default"],
    width: 348,
    height: 348,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAlElEQVR42nWOsQ3CMBBFz3YXYIBsAbQsQA8bwAogUSHEFlAxAFKKVFkgbcoskC5D5P3IVtLkpCf7/v/2nTnnNt77OzTQQoG2MzNnKoQbQgVH2MITSqw8BRqZNtWK/g+nFGj1chYI9B+4pIBmvriuo7mHGg5jQAtpZvz2KxO553xAZnHbnOYM1/hSZgdvW6hMZgjhNwCK2hWy3dIwLgAAAABJRU5ErkJggg==",
    blurWidth: 8,
    blurHeight: 8
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/Header.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "SearchContext": (()=>SearchContext),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$logo$2e$png__$5b$client$5d$__$28$static$2922$__$7d$__$5b$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_import__('[project]/public/images/logo.png.mjs { IMAGE => "[project]/public/images/logo.png [client] (static)" } [client] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$search$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$search$2e$png__$5b$client$5d$__$28$static$2922$__$7d$__$5b$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_import__('[project]/public/images/search.png.mjs { IMAGE => "[project]/public/images/search.png [client] (static)" } [client] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
const SearchContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])("");
const Header = ()=>{
    _s();
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    function handleLogoClick() {
        route.push('/'); // Redirect to the home page
    }
    function searchImgClick() {
        if (search !== "") {
            console.log(search);
            route.push(`/search?query=${encodeURIComponent(search)}`);
            setSearch("");
        } else {
            console.log("error");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchContext.Provider, {
        value: search,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center p-5 sm:px-10 md:px-20 lg:px-32 xl:px-72 justify-between  bg-gradient-to-tr from-zinc-50 from-50% via-zinc-500 to-100% ",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4 font-bold items-center justify-center ",
                    onClick: handleLogoClick,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$logo$2e$png__$5b$client$5d$__$28$static$2922$__$7d$__$5b$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                            height: 50,
                            width: 50,
                            alt: "...",
                            className: "h-8 md:h-14  "
                        }, void 0, false, {
                            fileName: "[project]/app/components/Header.tsx",
                            lineNumber: 37,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "xl:text-3xl lg:text-2xl md:text-xl hidden md:block font-bold",
                            children: "Movie Explorer"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Header.tsx",
                            lineNumber: 39,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Header.tsx",
                    lineNumber: 36,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex p-5 border-black gap-3 lg:gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "rounded-lg border-2 border-solid w-36 lg:w-max border-black p-2 xl:p-3",
                            placeholder: "search for movie",
                            type: "text",
                            value: search,
                            onChange: (event)=>setSearch(event.target.value),
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/app/components/Header.tsx",
                            lineNumber: 44,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: searchImgClick,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "cursor-pointer",
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$images$2f$search$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$images$2f$search$2e$png__$5b$client$5d$__$28$static$2922$__$7d$__$5b$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                height: 25,
                                width: 25,
                                alt: "..."
                            }, void 0, false, {
                                fileName: "[project]/app/components/Header.tsx",
                                lineNumber: 49,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/Header.tsx",
                            lineNumber: 48,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Header.tsx",
                    lineNumber: 42,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/Header.tsx",
            lineNumber: 32,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/Header.tsx",
        lineNumber: 31,
        columnNumber: 9
    }, this);
};
_s(Header, "rbJ9v2oVlXW/P9xi/+I3TkqtuB8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Header;
const __TURBOPACK__default__export__ = Header;
var _c;
__turbopack_refresh__.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/pages/search/index.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$movies$2e$json__$28$json$29$__ = __turbopack_import__("[project]/app/constants/movies.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$catagory$2e$json__$28$json$29$__ = __turbopack_import__("[project]/app/constants/catagory.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$LoaderComp$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/components/LoaderComp.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MovieCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/components/MovieCard.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Pagination$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/components/Pagination.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Header$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/components/Header.tsx [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
const Search = ()=>{
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [moviePerPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(12);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const lastMovie = currentPage * moviePerPage;
    const firstMovie = lastMovie - moviePerPage;
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const query = searchParams?.get('query') || '';
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$movies$2e$json__$28$json$29$__["default"].filter((movie)=>movie.title.toLowerCase().includes(query.toLowerCase()) || movie.Director.toLowerCase().includes(query.toLowerCase()));
    const filteredData = selectedCategory === 'All' ? data : data.filter((movie)=>movie.Category.some((catgy)=>catgy.toLowerCase().includes(selectedCategory.toLowerCase())));
    const movieLength = filteredData.length;
    const currentMovies = filteredData.slice(firstMovie, lastMovie);
    const handleCategoryChange = (event)=>{
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Search.useEffect": ()=>{
            const timer = setTimeout({
                "Search.useEffect.timer": ()=>{
                    setIsLoading(false);
                }
            }["Search.useEffect.timer"], 1000);
            return ({
                "Search.useEffect": ()=>clearTimeout(timer)
            })["Search.useEffect"];
        }
    }["Search.useEffect"], [
        query
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$LoaderComp$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/pages/search/index.tsx",
            lineNumber: 54,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: query && data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Header$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/search/index.tsx",
                        lineNumber: 59,
                        columnNumber: 29
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-around",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl text-center p-5 sm:text-4xl font-bold",
                                children: [
                                    "Search: ",
                                    query
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/search/index.tsx",
                                lineNumber: 61,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedCategory,
                                onChange: handleCategoryChange,
                                className: "mb-5 p-2",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$catagory$2e$json__$28$json$29$__["default"].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: item.name,
                                        children: item.name
                                    }, index, false, {
                                        fileName: "[project]/pages/search/index.tsx",
                                        lineNumber: 64,
                                        columnNumber: 41
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/search/index.tsx",
                                lineNumber: 62,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/search/index.tsx",
                        lineNumber: 60,
                        columnNumber: 29
                    }, this),
                    filteredData.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid xl:grid-cols-3 justify-center lg:grid-cols-2 grid-cols-1 gap-8 p-6 sm:px-20 md:px-52 lg:px-32 xl:px-60",
                                children: currentMovies.map((data, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MovieCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        data: data
                                    }, index, false, {
                                        fileName: "[project]/pages/search/index.tsx",
                                        lineNumber: 72,
                                        columnNumber: 45
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/search/index.tsx",
                                lineNumber: 70,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Pagination$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                length: movieLength,
                                currentPage: currentPage,
                                setCurrentPage: setCurrentPage
                            }, void 0, false, {
                                fileName: "[project]/pages/search/index.tsx",
                                lineNumber: 75,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-center font-semibold text-xl",
                        children: "No movies found"
                    }, void 0, false, {
                        fileName: "[project]/pages/search/index.tsx",
                        lineNumber: 78,
                        columnNumber: 33
                    }, this)
                ]
            }, void 0, true) : query ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: [
                    'No data found for "',
                    query,
                    '"'
                ]
            }, void 0, true, {
                fileName: "[project]/pages/search/index.tsx",
                lineNumber: 82,
                columnNumber: 25
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "No search term entered."
            }, void 0, false, {
                fileName: "[project]/pages/search/index.tsx",
                lineNumber: 84,
                columnNumber: 25
            }, this)
        }, void 0, false)
    }, void 0, false, {
        fileName: "[project]/pages/search/index.tsx",
        lineNumber: 52,
        columnNumber: 9
    }, this);
};
_s(Search, "MVUWrbgwGj2CbaamFZL8hho23cI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = Search;
const __TURBOPACK__default__export__ = Search;
var _c;
__turbopack_refresh__.register(_c, "Search");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/search/index.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const PAGE_PATH = "/search";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_require__("[project]/pages/search/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/pages/search/index.tsx (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_require__("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/search/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__0264f5._.js.map