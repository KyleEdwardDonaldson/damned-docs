---
title: Bless Colony
sidebar_position: 7
---

# Bless Colony

The `/colonies/:id/bless` endpoint allows users to bless their colony by trading in a relic. This process adds the relic's faith value to the colony, increasing its overall faith.

## Endpoint

**POST** `/colonies/:id/bless`

### Path Parameters

- **id** (required): The unique identifier of the colony to bless.
- **relic** (required): The unique identifier of the relic being used.

### Description

When a user blesses a colony, they sacrifice a relic, and the relic's faith value is added to the colony's faith level. The relic is removed from the user’s ownership and the colony’s faith level is increased by the relic's `faithValue`.

### Request Example

```http
POST /colonies/1234/bless?relic=5678
```

### Response

On success, the response includes the updated `Colony` object with the increased faith value.

#### Colony Object

| Field       | Type      | Description                                      |
|-------------|-----------|--------------------------------------------------|
| `ID`        | `string`  | The unique identifier of the colony.             |
| `Name`      | `string`  | The name of the colony.                          |
| `Faith`     | `int`     | The updated faith value after blessing.          |
| `SettledBy` | `string`  | The ID of the user who owns the colony.          |

### Response Example

```json
{
  "status": "success",
  "message": "used relic on colony",
  "data": {
    "ID": "1234",
    "Name": "Eldergrove",
    "Faith": 150,
    "SettledBy": "user_567"
  }
}
```

### Error Responses

- **400 Bad Request**: Returned if either `colonyId` or `relic` parameter is missing.
  ```json
  {
    "status": "error",
    "message": "both colonyId and relic id are required",
    "data": {
      "statusCode": 400,
      "message": "colonyId or relic id parameter is missing"
    }
  }
  ```

- **500 Internal Server Error**: Returned if there is an issue processing the request.

## Usage

1. **Specify the Colony and Relic**: Ensure you have the correct colony and relic IDs.
2. **Invoke the Bless Endpoint**: Make a `POST` request to `/colonies/:id/bless` with both `id` and `relic` parameters.
3. **Increase Faith**: Upon success, the colony's faith level will be incremented by the relic's faith value, and the relic will be removed from the user's ownership.

This endpoint is useful for strengthening your colony's faith using relics acquired during gameplay.
