<p align="center">
  <img src="./assets/logo.png" alt="axios-token-refresh Logo" width="200" />
</p>

# axios-token-refresh

`axios-token-refresh` is a utility for handling token refresh logic in Axios via interceptor. It intercepts responses and retries requests when specific status codes (e.g., 401) are encountered.

## Features

- Automatically retries requests after refreshing tokens.
- Configurable retry logic and status codes.
- Lightweight and easy to integrate with Axios.

## Installation

With npm:
```bash
npm install axios-token-refresh
```

With yarn:
```bash
yarn add axios-token-refresh
```

With bun:
```bash
bun add axios-token-refresh
```

### Configuration Options

Below is a table describing the available options for configuring token refresh behavior:

| Option          | Type                          | Description                                                                                     | Default   |
|------------------|-------------------------------|-------------------------------------------------------------------------------------------------|-----------|
| `refreshRequest` | `(error: any) => Promise<any>`| The function that will be called to refresh the token. It should return a promise.              | Required  |
| `statusCodes`    | `number[]`                   | (Optional) List of status codes that should trigger a token refresh.                           | `[401]`   |
| `shouldRetry`    | `(error: AxiosError) => boolean` | (Optional) A custom function to determine whether to refresh. If provided, `statusCodes` will be ignored. | `undefined` |
| `retryTimes`     | `number`                     | (Optional) The number of times to retry the request.                                            | `1`       |
| `onRetry`        | `(requestConfig: AxiosRequestConfig) => AxiosRequestConfig \| Promise<AxiosRequestConfig>` | (Optional) A callback function that is called before each `refreshRequest`. It can modify and return the request configuration. | `undefined` |