/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import axios from 'axios';
import registerAxiosTokenRefresh from 'axios-token-refresh';
import { VALID_REFRESH_TOKEN } from '@src/constants';
import { getRandomToken } from '@src/utils';

const EXPIRED_ACCESS_TOKEN = 'expired-access-token';

interface ApiCall {
    id: number;
    type: 'initial' | 'retry';
    status: 'pending' | 'success' | 'error' | 'refreshing';
    timestamp: number;
    response?: string;
    error?: string;
}

export default function Example() {
    const [mockAccessToken, setMockAccessToken] = useState('expired-access-token');
    const [refreshCount, setRefreshCount] = useState(0);
    const [apiCalls, setApiCalls] = useState<ApiCall[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    // Create axios instance
    const api = React.useMemo(() => {
        const instance = axios.create({ baseURL: '/api' });

        // Attach token to every request
        instance.interceptors.request.use((config) => {
            config.headers['Authorization'] = `Bearer ${mockAccessToken}`;
            return config;
        });

        // Register refresh logic
        registerAxiosTokenRefresh(instance, {
            refreshRequest: async () => {
                setApiCalls((prev) => prev.map((call) => (call.status === 'error' ? { ...call, status: 'refreshing' } : call)));

                const res = await axios.get('/api/mockApi?type=refresh', {
                    headers: { Authorization: `Bearer ${VALID_REFRESH_TOKEN}` },
                });

                if (res.status === 200) {
                    const newAccessToken = res.data.accessToken;
                    setRefreshCount((prev) => prev + 1);
                    setMockAccessToken(newAccessToken);
                    return { accessToken: newAccessToken };
                } else {
                    throw new Error('Invalid refresh token');
                }
            },
            statusCodes: [401],
            onRetry: (config) => {
                config.headers['Authorization'] = `Bearer ${getRandomToken()}`;
                return config;
            },
        });

        return instance;
    }, [mockAccessToken]);

    const callProtectedAPI = async () => {
        if (isProcessing) return;

        setIsProcessing(true);
        const callId = Date.now();

        setApiCalls((prev) => [
            ...prev,
            {
                id: callId,
                type: 'initial',
                status: 'pending',
                timestamp: Date.now(),
            },
        ]);

        try {
            const res = await axios.get('/api/mockApi?type=access', {
                headers: { Authorization: `Bearer ${mockAccessToken}` },
            });

            setApiCalls((prev) => prev.map((call) => (call.id === callId ? { ...call, status: 'success', response: res.data.message } : call)));
        } catch (error: any) {
            if (error.response?.status === 401) {
                setApiCalls((prev) =>
                    prev.map((call) => (call.id === callId ? { ...call, status: 'error', error: 'Token expired - attempting refresh' } : call)),
                );

                // Trigger retry with refresh
                try {
                    const retryRes = await api.get('/mockApi?type=access');
                    console.log('Retry response:', retryRes);
                    setApiCalls((prev) => [
                        ...prev,
                        {
                            id: Date.now(),
                            type: 'retry',
                            status: 'success',
                            timestamp: Date.now(),
                            response: retryRes.data?.message,
                        },
                    ]);
                } catch {
                    setApiCalls((prev) => [
                        ...prev,
                        {
                            id: Date.now(),
                            type: 'retry',
                            status: 'error',
                            timestamp: Date.now(),
                            error: 'Retry failed',
                        },
                    ]);
                }
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setMockAccessToken(EXPIRED_ACCESS_TOKEN);
        setRefreshCount(0);
        setApiCalls([]);
        setIsProcessing(false);
    };

    const expiredToken = () => {
        setMockAccessToken(EXPIRED_ACCESS_TOKEN);
    };

    const getStatusColor = (status: ApiCall['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-200 text-yellow-800';
            case 'success':
                return 'bg-green-200 text-green-800';
            case 'error':
                return 'bg-red-200 text-red-800';
            case 'refreshing':
                return 'bg-blue-200 text-blue-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Token Refresh Flow Visualization</h1>

            {/* Control Panel */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Control Panel</h2>
                <div className="flex flex-col lg:flex-row flex-wrap gap-4 mb-4">
                    <div className='flex-1'>
                        <label className="block text-sm font-medium mb-1">Current Access Token:</label>
                        <div className="font-mono text-sm p-2 bg-white dark:bg-gray-700 rounded border max-w-full break-all">{mockAccessToken}</div>
                    </div>
                    <div className='flex-1'>
                        <label className="block text-sm font-medium mb-1">Refresh Count:</label>
                        <div className="font-mono text-sm p-2 bg-white dark:bg-gray-700 rounded border max-w-full break-all">{refreshCount}</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        onClick={callProtectedAPI}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Call Protected API'}
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={expiredToken}>
                        Reset Token to Expired
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700" onClick={reset}>
                        Reset Demo
                    </button>
                </div>
            </div>
            
            {/* State Machine Visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="flex flex-wrap gap-4 justify-center">
                    {[
                        { state: 'idle', active: !isProcessing && apiCalls.length === 0 },
                        { state: 'requesting', active: isProcessing && !apiCalls.some((c) => c.status === 'error') },
                        { state: 'token_expired', active: apiCalls.some((c) => c.status === 'error') },
                        { state: 'refreshing', active: apiCalls.some((c) => c.status === 'refreshing') },
                        { state: 'success', active: apiCalls.some((c) => c.status === 'success') && !isProcessing },
                    ].map(({ state, active }) => (
                        <div
                            key={state}
                            className={`px-4 py-2 rounded-lg border-2 transition-all ${
                                active
                                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                    : 'border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-600'
                            }`}
                        >
                            {state.replace('_', ' ').toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>

            {/* Flow Visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Request Flow</h2>
                <div className="space-y-3">
                    {apiCalls.length === 0 ? (
                        <div className="text-gray-500 text-center py-8">Click &quot;Call Protected API&quot; to start the demo</div>
                    ) : (
                        apiCalls.map((call) => (
                            <div
                                key={call.id}
                                className={`p-4 rounded-lg border-l-4 ${call.type === 'initial' ? 'border-blue-500' : 'border-green-500'}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                                            {call.status.toUpperCase()}
                                        </span>
                                        <span className="font-medium">{call.type === 'initial' ? '📞 Initial Request' : '🔄 Retry Request'}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{new Date(call.timestamp).toLocaleTimeString()}</span>
                                </div>
                                {call.response && <div className="text-sm text-green-700 dark:text-green-300">✅ {call.response}</div>}
                                {call.error && <div className="text-sm text-red-700 dark:text-red-300">❌ {call.error}</div>}
                            </div>
                        ))
                    )}
                </div>
            </div>


            {/* Configuration Display */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Current Configuration</h2>
                <pre className="bg-white dark:bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                    <code>{`registerAxiosTokenRefresh(api, {
  refreshRequest: async () => {
    // Call refresh endpoint with refresh token
    const res = await axios.get("/api/mockApi?type=refresh", {
      headers: { Authorization: "Bearer ${VALID_REFRESH_TOKEN}" }
    });
    return { accessToken: res.data.accessToken };
  },
  statusCodes: [401], // Trigger refresh on 401
  onRetry: (config) => {
    // Update authorization header for retry
    config.headers["Authorization"] = "Bearer " + newAccessToken;
    return config;
  }
});`}</code>
                </pre>
            </div>
        </div>
    );
}
