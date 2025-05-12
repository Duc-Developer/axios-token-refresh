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