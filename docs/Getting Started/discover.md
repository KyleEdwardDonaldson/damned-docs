---
title: Discover
sidebar_position: 4
---

# Discover Cache

The `/discover` endpoint allows a pilgrim to discover the cache at their current location. Discovering the cache will add them to the `VisitedBy` list, mark them as the discoverer if no one else has discovered it, and award any items contained in the cache to the pilgrim.

## Endpoint

**POST** `/pilgrims/:id/discover`

### Path Parameters

- **id**: The unique identifier of the pilgrim attempting the discovery.

## Request Example

```http
POST /pilgrims/examplePilgrimId/discover
```

## Response

The response contains the updated `Pilgrim` object after the discovery process, with any new items added to their inventory.

### Pilgrim Object

| Field       | Type       | Description                                          |
|-------------|------------|------------------------------------------------------|
| `id`        | `string`   | The unique identifier of the pilgrim.                |
| `name`      | `string`   | The name of the pilgrim.                             |
| `faith`     | `int`      | The faith value associated with the pilgrim.         |
| `trainedBy` | `string`   | The user or entity that trained this pilgrim.        |
| `colonyId`  | `string`   | The ID of the colony the pilgrim belongs to.         |
| `travel`    | `object`   | Travel information, including destination and status.|
| `inventory` | `array`    | Array of `Item` objects that the pilgrim possesses.  |

### Item Object

Each item in the `inventory` has the following structure:

| Field        | Type     | Description                                        |
|--------------|----------|----------------------------------------------------|
| `id`         | `string` | The unique identifier of the item.                 |
| `name`       | `string` | The name of the item.                              |
| `type`       | `string` | The type or category of the item.                  |
| `faithValue` | `int`    | The faith value associated with the item.          |
| `rarity`     | `int`    | Rarity scale of the item (lower values are rarer). |
| `quantity`   | `int`    | The quantity of this item owned by the pilgrim.    |

### Example Response

```json
{
  "status": "success",
  "message": "discovered cache with pilgrim",
  "data": {
    "id": "examplePilgrimId",
    "name": "Ava the Bold",
    "faith": 100,
    "trainedBy": "exampleUserId",
    "colonyId": "exampleColonyId",
    "travel": {
      "status": "ARRIVED",
      "destination": {
        "x": 10,
        "y": 15
      },
      "origin": {
        "x": 9,
        "y": 14
      },
      "timeOfArrival": "2024-11-05T12:34:56Z",
      "survivalRating": 0.75
    },
    "inventory": [
      {
        "id": "item1",
        "name": "Ancient Relic",
        "type": "Relic",
        "faithValue": 50,
        "rarity": 100,
        "quantity": 1
      },
      {
        "id": "item2",
        "name": "Mystic Gemstone",
        "type": "Gem",
        "faithValue": 20,
        "rarity": 500,
        "quantity": 3
      }
    ]
  }
}
```

## Error Responses

- **409 Conflict**: Returned if the pilgrim is either deceased or already en route to another location.
  ```json
  {
    "status": "error",
    "message": "pilgrim can't be utilised while deceased",
    "data": {
      "statusCode": 409,
      "message": "pilgrim can't be utilised while deceased"
    }
  }
  ```

  - **400 Bad Request**: Returned if there's an error during the discovery process.
  ```json
  {
    "status": "error",
    "message": "failed to discover cache with pilgrim",
    "data": {
      "statusCode": 400,
      "message": "Error details here"
    }
  }
  ```

## Usage Notes

1. **Discover Cache**: Pilgrim must be at the destination and not in transit to discover the cache.
2. **VisitedBy and DiscoveredBy**: The pilgrim will be added to the `VisitedBy` list, and marked as the `DiscoveredBy` if no other pilgrim has claimed it.
3. **Inventory Update**: Any items found within the cache will be added to the pilgrim's inventory.

The `/discover` endpoint allows players to claim unique caches in the game world, enhancing their inventory and contributing to their overall strength in the game.
