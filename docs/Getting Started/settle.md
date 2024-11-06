---
title: Establish Colony
sidebar_position: 2
---

# Establishing a Colony

This endpoint allows players to establish a new colony on the game map, claiming a specific location for resource gathering, trade, and defense.

---

## Endpoint

**`POST /colonies`**

## Description

Creates a new colony at the specified location. Once a colony is established, it gains access to resource collection and trading options within the specified region.

---

## Request Parameters

### Headers

| Name           | Type     | Required | Description                   |
|----------------|----------|----------|-------------------------------|
| `Authorization`| `string` | Yes      | Bearer token for authentication|

### Body Parameters

| Name        | Type      | Required | Description                              |
|-------------|-----------|----------|------------------------------------------|
| `location`  | `object`  | Yes      | Coordinates of the desired colony location. |
| `name`      | `string`  | Yes      | Name for the new colony.                |
| `leaderId`  | `string`  | Yes      | ID of the player or character leading the colony. |
| `resources` | `object`  | Optional | Initial resource allocations (e.g., `food`, `water`).|

#### Location Object
| Field  | Type | Description                           |
|--------|------|---------------------------------------|
| `x`    | `int`| X-coordinate of the colony’s location |
| `y`    | `int`| Y-coordinate of the colony’s location |

---

## Example Request

```json
POST /colonies
Authorization: Bearer your-token

{
  "location": {
    "x": 42,
    "y": -18
  },
  "name": "New Dawn",
  "leaderId": "player123",
  "resources": {
    "food": 500,
    "water": 300
  }
}
