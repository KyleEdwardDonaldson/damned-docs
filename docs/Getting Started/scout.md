---
title: Scout Location
sidebar_position: 4
---

# Scout Location

The `scout` endpoint allows a pilgrim to scout a specific location to find other colonies or caches. The pilgrim must be within one coordinate point of the target location; otherwise, an error will be returned.

## Endpoint

**POST** `/pilgrims/:id/scout`

### Parameters

- `id` (path): The unique identifier of the pilgrim who will be scouting.

### Request Body

The request body should contain the target coordinates that the pilgrim will scout.

#### Request Body Example

```json
{
  "x": 10,
  "y": 15
}
```

| Field | Type | Description |
|-------|------|-------------|
| `x`   | int  | The X coordinate of the target location. |
| `y`   | int  | The Y coordinate of the target location. |

### Response

On success, the endpoint returns a `Cache` object for the scouted location, including details such as the cache's name, type, and survival rating. If the pilgrim is too far from the location, an error message will be returned.

### Response Example

```json
{
  "status": "success",
  "message": "scouted location with pilgrim",
  "data": {
    "id": "cache123",
    "name": "Ancient Cache",
    "type": "relic",
    "location": {
      "x": 10,
      "y": 15
    },
    "survivalRating": 0.85,
    "rewardsItems": [
      {
        "id": "item456",
        "name": "Mysterious Relic",
        "type": "artifact",
        "faithValue": 50,
        "rarity": 10,
        "quantity": 1
      }
    ],
    "expiryDate": "2024-12-31T23:59:59Z",
    "discoveredBy": "user123",
    "visitedBy": ["user123", "user456"]
  }
}
```

| Field            | Type         | Description |
|------------------|--------------|-------------|
| `id`             | `string`     | The unique identifier of the cache. |
| `name`           | `string`     | The name of the cache. |
| `type`           | `string`     | The type of the cache, e.g., "relic". |
| `location`       | `object`     | The coordinates of the cache location. |
| `survivalRating` | `float`      | The chance of survival for this location. |
| `rewardsItems`   | `array`      | List of items found in the cache. |
| `expiryDate`     | `datetime`   | The expiration date of the cache (if any). |
| `discoveredBy`   | `string`     | ID of the user who discovered the cache. |
| `visitedBy`      | `array`      | List of IDs of pilgrims who have visited the cache. |

### Error Responses

- **400 Bad Request**: Returned if the pilgrim is too far away from the target location.
