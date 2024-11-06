---
title: Start
sidebar_position: 2
---

# Generate Token

The `/start` endpoint generates an API token for a user, which they can use for authentication in subsequent requests.

## Endpoint

**POST** `/start`

## Query Parameters

- **userId** (required): The unique identifier of the user requesting the token.

## Request Example

```http
POST /start?userId=exampleUserID
```

## Response

The response will include a `User` object, containing the generated API token and additional user details. This token will be used in future requests for authentication.

### User Object

| Field      | Type      | Description                                        |
|------------|-----------|----------------------------------------------------|
| `userId`   | `string`  | The unique identifier for the user.                |
| `token`    | `string`  | The API token generated for the user.              |
| `createdAt`| `datetime`| The date and time when the token was created.      |
| `expiresAt`| `datetime` (optional) | Expiration date and time for the token. |

## Response Example

```json
{
  "status": "success",
  "message": "token generated successfully",
  "data": {
    "userId": "exampleUserID",
    "token": "d50f1bc0-5c84-4a6d-a7c4-fd22e7d6e97f",
    "createdAt": "2024-11-05T12:34:56Z",
    "expiresAt": "2025-11-05T12:34:56Z"
  }
}
```

## Error Responses

- **400 Bad Request**: Returned if the `userId` query parameter is missing.
  ```json
  {
    "status": "error",
    "message": "user ID is required",
    "data": {
      "statusCode": 400,
      "message": "user ID parameter is missing"
    }
  }
  ```

- **500 Internal Server Error**: Returned if the token generation fails.
  ```json
  {
    "status": "error",
    "message": "failed to generate token",
    "data": {
      "statusCode": 500,
      "message": "An internal error occurred"
    }
  }
  ```

## Usage

1. **Get the Token**: Make a `POST` request to `/start` with the `userId` as a query parameter.
2. **Store the Token**: Use the generated `token` in the response for subsequent authenticated requests.
3. **Pass the Token**: Include the token in your requests to access the game API functionalities.

This endpoint must be called once to obtain an API token, which is required for all further requests.
