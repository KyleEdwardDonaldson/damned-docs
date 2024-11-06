---
title: Send Pilgrim
sidebar_position: 5
---

# Send Pilgrim

The `/pilgrims/:id/send` endpoint allows you to dispatch a pilgrim to a specified location.

## Endpoint

**POST** `/pilgrims/:id/send`

## Path Parameters

- **id** (required): The unique identifier of the pilgrim to send.

## Request Body

The body of the request should include the target coordinates.

| Field | Type | Description |
|-------|------|-------------|
| `x`   | `int` | The x-coordinate of the destination. |
| `y`   | `int` | The y-coordinate of the destination. |

### Request Example

```http
POST /pilgrims/12345/send
Content-Type: application/json

{
  "x": 10,
  "y": 15
}
```

## Response

The response will include an updated `Pilgrim` object, showing the new travel status and destination details.

### Pilgrim Object

| Field        | Type         | Description                                          |
|--------------|--------------|------------------------------------------------------|
| `id`         | `string`     | Unique identifier of the pilgrim.                    |
| `name`       | `string`     | Name of the pilgrim.                                 |
| `faith`      | `int`        | Faith level of the pilgrim.                          |
| `trainedBy`  | `string`     | ID of the trainer or owner of the pilgrim.           |
| `colonyId`   | `string`     | ID of the colony the pilgrim belongs to.             |
| `travel`     | `Travel`     | Travel details of the pilgrim (status, destination). |
| `inventory`  | `array`      | Array of items carried by the pilgrim.               |

### Travel Object

| Field           | Type      | Description                                               |
|-----------------|-----------|-----------------------------------------------------------|
| `status`        | `string`  | Current travel status (e.g., "EN_ROUTE").                 |
| `destination`   | `object`  | Coordinates object of the target location.                |
| `origin`        | `object`  | Coordinates object of the starting location.              |
| `timeOfArrival` | `datetime`| Estimated time of arrival at the destination.             |
| `survivalRating`| `float`   | Calculated survival chance based on the journey distance. |

### Response Example

```json
{
  "status": "success",
  "message": "sent pilgrim",
  "data": {
    "id": "12345",
    "name": "Brave Pilgrim",
    "faith": 150,
    "trainedBy": "trainer123",
    "colonyId": "colony789",
    "travel": {
      "status": "EN_ROUTE",
      "destination": {
        "x": 10,
        "y": 15
      },
      "origin": {
        "x": 5,
        "y": 5
      },
      "timeOfArrival": "2024-11-06T10:45:00Z",
      "survivalRating": 0.85
    },
    "inventory": []
  }
}
```

## Error Responses

- **400 Bad Request**: If the coordinates are missing or invalid.
  ```json
  {
    "status": "error",
    "message": "failed to parse coordinates request body",
    "data": {
      "statusCode": 400,
      "message": "Coordinates are invalid or missing."
    }
  }
  ```

- **409 Conflict**: If the pilgrim cannot be dispatched due to an existing "EN_ROUTE" status or if they are deceased.
  ```json
  {
    "status": "error",
    "message": "pilgrim can't be utilised while already en route",
    "data": {
      "statusCode": 409,
      "message": "pilgrim can't be utilised while already en route to destination"
    }
  }
  ```

## Usage

1. **Send Pilgrim**: Make a `POST` request to `/pilgrims/:id/send` with the pilgrim's ID and the target coordinates.
2. **Check Response**: Review the response to verify the pilgrim's updated travel status, destination, and survival rating.
