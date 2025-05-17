<p align="center">
  <img src="./assets/logo.png" alt="axios-token-refresh Logo" width="200" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/axios-token-refresh">
    <img src="https://img.shields.io/npm/v/axios-token-refresh.svg" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/axios-token-refresh">
    <img src="https://img.shields.io/npm/dm/axios-token-refresh.svg" alt="npm downloads" />
  </a>
  <a href="https://github.com/Duc-Developer/axios-token-refresh/actions">
    <img src="https://github.com/Duc-Developer/axios-token-refresh/workflows/CI/badge.svg" alt="build status" />
  </a>
  <a href="https://github.com/Duc-Developer/axios-token-refresh">
    <img src="https://img.shields.io/github/stars/Duc-Developer/axios-token-refresh.svg" alt="GitHub stars" />
  </a>
  <a href="https://github.com/Duc-Developer/axios-token-refresh/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Duc-Developer/axios-token-refresh.svg" alt="license" />
  </a>
</p>

# axios-token-refresh

`axios-token-refresh` is a lightweight and powerful utility for handling token refresh logic in Axios. It seamlessly integrates with Axios interceptors to automatically retry failed requests after token expiration. Perfect for managing authentication flows in modern web applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Demo](#demo)
- [Example Usage](#example-usage)
- [Configuration Options](#configuration-options)
- [Contributing](#contributing)
- [License](#license)

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

## Demo
You can see quickly demo [here](https://axios-token-refresh.vercel.app/example).

## Example Usage

Here is an example of how to use `axios-token-refresh` in your project:

```tsx
import axios from 'axios';
import registerAxiosTokenRefresh from 'axios-token-refresh';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
});

// Define the refresh token function
const refreshAuthLogic = (failedRequest) =>
  axios.post('https://api.example.com/refresh-token', {
    token: localStorage.getItem('refreshToken'),
  }).then((tokenRefreshResponse) => {
    localStorage.setItem('accessToken', tokenRefreshResponse.data.accessToken);
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.accessToken;
    return Promise.resolve(failedRequest);
  });

// Add the interceptor to the Axios instance
registerAxiosTokenRefresh(apiClient, { refreshRequest: refreshAuthLogic });

// Example API request
apiClient.get('/protected-resource', {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  },
}).then((response) => {
  console.log('Protected resource data:', response.data);
}).catch((error) => {
  console.error('Error fetching protected resource:', error);
});
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

## Why Use This Package?

- **Lightweight**: Minimal overhead, designed to integrate seamlessly with Axios.
- **Customizable**: Configure retry logic, status codes, and token refresh behavior.
- **Easy to Use**: Simple API for quick integration into your project.
- **Reliable**: Automatically retries failed requests after token expiration.
- **Flexible**: Works with any authentication flow, including OAuth and JWT.

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## Support

If you encounter any issues or have questions, please open an issue on [GitHub](https://github.com/Duc-Developer/axios-token-refresh/issues) or start a discussion in the [Discussions](https://github.com/Duc-Developer/axios-token-refresh/discussions) section.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
---

`axios-token-refresh` is a utility for handling token refresh logic in Axios. It is ideal for managing authentication flows, retrying failed requests, and integrating with OAuth or JWT-based systems. Lightweight, customizable, and easy to use.