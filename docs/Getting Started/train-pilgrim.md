---
title: Train Pilgrim
sidebar_position: 3
---

# Train Pilgrim

This endpoint allows players to train an existing pilgrim by giving them a new name and increasing their attributes or skills, potentially influenced by the provided training parameters.

---

## Endpoint

**`POST /pilgrims`**

## Description

Trains a pilgrim associated with a specific colony and user, enabling them to increase their capabilities in the game. Training can affect attributes like Faith and Inventory.

---

## Request Parameters

### Headers

| Name           | Type     | Required | Description                        |
|----------------|----------|----------|------------------------------------|
| `Authorization`| `string` | Yes      | Bearer token for authentication.   |

### Body Parameters

| Name          | Type   | Required | Description                                         |
|---------------|--------|----------|-----------------------------------------------------|
| `colonyId`    | `string` | Yes      | The ID of the colony where the pilgrim resides.     |
| `pilgrimName` | `string` | Yes      | The new name for the pilgrim. Must be alphabetic.   |
| `pilgrimId`   | `string` | Yes      | The unique ID of the pilgrim to be trained.         |

### Constraints

- **Pilgrim Name**: Must be a non-empty alphabetic string.

---

## Example Request

```json
POST /api/v1/pilgrims
Authorization: Bearer your-token

{
  "colonyId": "colony123",
  "pilgrimName": "Valiant Guardian",
  "pilgrimId": "pilgrim456"
}
