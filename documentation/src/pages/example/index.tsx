/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import axios from "axios";
import axiosTokenRefresh from "axios-token-refresh";
import { useMachine } from "@xstate/react";
import { authMachine } from "@utils/machines/authMachine";

// Token constants for demo
const VALID_ACCESS_TOKEN = "valid-access-token";
const VALID_REFRESH_TOKEN = "valid-refresh-token";

// Demo state
let mockAccessToken = "expired-access-token";
const mockRefreshToken = VALID_REFRESH_TOKEN;
let refreshCount = 0;

// Axios instance
const api = axios.create({ baseURL: "/api" });

// Attach token to every request
api.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${mockAccessToken}`;
    return config;
});

// Simulate protected API using /api/mockApi?type=access
api.get = async () => {
    const res = await axios.get("/mockApi?type=access", {
        headers: { Authorization: `Bearer ${mockAccessToken}` },
    });
    return { data: res.data.message };
};

// Simulate refresh endpoint using /api/mockApi?type=refresh
api.post = async (url: string) => {
    if (url === "/refresh") {
        const res = await axios.get("/refresh", {
            headers: { Authorization: `Bearer ${mockRefreshToken}` },
        });
        if (res.status === 200) {
            refreshCount += 1;
            mockAccessToken = VALID_ACCESS_TOKEN;
            return { data: { accessToken: VALID_ACCESS_TOKEN } };
        } else {
            throw new Error("Invalid refresh token");
        }
    }
    return { data: {} };
};

// Register refresh logic
axiosTokenRefresh(api, {
    refreshRequest: async () => {
        const res = await api.post("/refresh");
        return { accessToken: res.data.accessToken };
    },
    statusCodes: [401],
});

export default function Example() {
    const [state, send] = useMachine(authMachine, {
        services: {
            fetchApi: async () => {
                const res = await api.get("/mockApi");
                return res.data;
            },
            refreshToken: async () => {
                const res = await api.post("/refresh");
                return res.data.accessToken;
            },
        },
    });

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Token Refresh Flow Demo</h1>
            <div className="mb-4">
                <button
                    className="px-4 py-2 bg-blue-100 text-black rounded mr-2"
                    onClick={() => {
                        mockAccessToken = "expired-access-token";
                        send({ type: "FETCH" });
                    }}
                    disabled={state.matches("fetching") || state.matches("refreshing")}
                    type="button"
                >
                    Call Protected API
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 text-black rounded"
                    onClick={() => window.location.reload()}
                    type="button"
                >
                    Reset
                </button>
            </div>
            <div className="mb-4">
                <div>
                    <b>Current access token:</b> <span className="font-mono">{mockAccessToken}</span>
                </div>
                <div>
                    <b>Refresh count:</b> <span className="font-mono">{refreshCount}</span>
                </div>
            </div>
            <div className="mb-4">
                <b>State:</b>{" "}
                <span className="font-mono text-blue-700">{state.value.toString()}</span>
            </div>
            <div className="mb-4">
                {state.matches("success") && (
                    <div className="p-3 bg-green-300 text-gray-500 rounded">✅ {state.context.data}</div>
                )}
                {state.matches("failure") && (
                    <div className="p-3 bg-red-300 text-gray-500 rounded">❌ {state.context.error}</div>
                )}
                {state.matches("tokenExpired") && (
                    <div className="p-3 bg-yellow-300 rounded flex items-center gap-2">
                        <span>🔒 Token expired.</span>
                        <button
                            className="px-3 py-1 bg-blue-300 text-black rounded"
                            onClick={() => send({ type: "REFRESH" })}
                            type="button"
                        >
                            Refresh Token
                        </button>
                    </div>
                )}
                {state.matches("fetching") && (
                    <div className="p-3 bg-blue-100 text-gray-500 rounded">⏳ Fetching...</div>
                )}
                {state.matches("refreshing") && (
                    <div className="p-3 bg-blue-100 text-gray-500 rounded">🔄 Refreshing token...</div>
                )}
            </div>
            <div className="mt-8">
                <b>Flow:</b>
                <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-2 py-1 rounded ${state.matches("idle") ? "bg-blue-200" : "bg-gray-500"}`}>idle</span>
                    <span className={`px-2 py-1 rounded ${state.matches("fetching") ? "bg-blue-200" : "bg-gray-500"}`}>fetching</span>
                    <span className={`px-2 py-1 rounded ${state.matches("tokenExpired") ? "bg-blue-200" : "bg-gray-500"}`}>tokenExpired</span>
                    <span className={`px-2 py-1 rounded ${state.matches("refreshing") ? "bg-blue-200" : "bg-gray-500"}`}>refreshing</span>
                    <span className={`px-2 py-1 rounded ${state.matches("success") ? "bg-green-200" : "bg-gray-500"}`}>success</span>
                    <span className={`px-2 py-1 rounded ${state.matches("failure") ? "bg-red-200" : "bg-gray-500"}`}>failure</span>
                </div>
            </div>
        </div>
    );
}