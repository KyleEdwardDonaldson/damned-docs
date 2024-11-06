---
title: Pray
sidebar_position: 8
---

# Pray

The `/colonies/:id/pray` endpoint allows users to pray at a specific colony, adding faith to the colony once every 24 hours.

## Endpoint

**POST** `/colonies/:id/pray`

## Path Parameters

- **id** (required): The unique identifier of the colony where the prayer is to be performed.

## Functionality

If it has been at least 24 hours since the last prayer, this action will add 500 faith to the colony. If the colony has prayed within the last 24 hours, an error message is returned indicating when the next prayer can be performed.

## Request Example

```http
POST /colonies/exampleColonyID/pray
```

## Response

If successful, the response will include the updated `Colony` object, showing the new faith value and the updated `NextPrayerAt` timestamp set to 24 hours in the future.

### Colony Object

| Field           | Type      | Description                                                    |
|-----------------|-----------|----------------------------------------------------------------|
| `id`            | `string`  | The unique identifier for the colony.                          |
| `faith`         | `int`     | The updated faith value for the colony.                        |
| `NextPrayerAt`  | `datetime`| The timestamp indicating when the next prayer can occur.       |

## Response Example

```json
{
  "status": "success",
  "message": "prayed",
  "data": {
    "id": "exampleColonyID",
    "faith": 1500,
    "NextPrayerAt": "2024-11-07T12:34:56Z"
  }
}
```

## Error Responses

- **400 Bad Request**: Returned if the `colonyId` parameter is missing.
  ```json
  {
    "status": "error",
    "message": "colonyId is required",
    "data": {
      "statusCode": 400,
      "message": "colonyId parameter is missing"
    }
  }
  ```

- **409 Conflict**: Returned if it’s too early to pray again.
  ```json
  {
    "status": "error",
    "message": "failed to pray",
    "data": {
      "statusCode": 409,
      "message": "not possible to pray at exampleColonyID until 2024-11-07T12:34:56Z"
    }
  }
  ```

## Usage

1. **Initiate Prayer**: Make a `POST` request to `/colonies/:id/pray` with the `colonyId`.
2. **Receive Updated Faith**: If successful, the colony's `faith` is increased by 500, and `NextPrayerAt` is set to 24 hours in the future.
3. **Check Prayer Availability**: Use the error message's `NextPrayerAt` timestamp to know when the next prayer can occur.
