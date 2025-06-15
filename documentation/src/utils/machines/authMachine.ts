/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMachine, assign, ProvidedActor, ParameterizedObject, MetaObject, EventObject, MachineContext } from "xstate";

// Context
export interface AuthContext extends MachineContext {
    token?: string | null;
    error: string | null;
    data: string | null;
}

// Events
type AuthEvent =
    | { type: "FETCH" }
    | { type: "REFRESH" }
    | { type: "done.invoke.fetchApi"; data: string }
    | { type: "error.platform.fetchApi"; data: { message: string } }
    | { type: "done.invoke.refreshToken"; data: string }
    | { type: "error.platform.refreshToken"; data: { message: string } };

// All type params for createMachine
type TContext = AuthContext;
type TEvent = AuthEvent;
type TActor = ProvidedActor;
type TAction = ParameterizedObject;
type TGuard = ParameterizedObject;
type TDelay = string;
type TTag = string;
type TInput = unknown;
type TOutput = unknown;
type TEmitted = EventObject;
type TMeta = MetaObject;

export const authMachine = createMachine<TContext, TEvent, TActor, TAction, TGuard, TDelay, TTag, TInput, TOutput, TEmitted, TMeta, any>({
    id: "auth",
    initial: "idle",
    context: {
        token: null,
        error: null,
        data: null,
    },
    states: {
        idle: {
            on: { FETCH: "fetching" },
        },
        fetching: {
            invoke: {
                src: "fetchApi",
                onDone: {
                    target: "success",
                    actions: assign({
                        data: (_, event) => (event as any).data,
                        error: () => null,
                    }),
                },
                onError: {
                    target: "tokenExpired",
                    actions: assign({
                        error: (_, event) => (event as any).data?.message,
                    }),
                },
            },
        },
        tokenExpired: {
            on: { REFRESH: "refreshing" },
        },
        refreshing: {
            invoke: {
                src: "refreshToken",
                onDone: {
                    target: "fetching",
                    actions: assign({
                        token: (_, event) => (event as any).data ?? null,
                        error: () => null,
                    }),
                },
                onError: {
                    target: "failure",
                    actions: assign({
                        error: (_, event) => (event as any).data?.message,
                    }),
                },
            },
        },
        success: {
            on: { FETCH: "fetching" },
        },
        failure: {
            on: { FETCH: "fetching" },
        },
    },
});
