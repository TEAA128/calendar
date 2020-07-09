# Project Name

> Full Stack Hostel Booking web application

## Related Projects

  - https://github.com/TEAA128/calendar
  - https://github.com/TEAA128/reviews
  - https://github.com/TEAA128/carousel
  - https://github.com/TEAA128/PhotoGallery

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
npm install start
```

To seed database, from within the root directory:

```sh
npm db:setup
```

## Server API

### Get calendar info a place
  * GET `/api/places/:placeID/calendar/`

**Path Parameters:**
  * `placeID` place id

**Success Status Code:** `200`

**Returns:** JSON

```json
[
    {
        "_id": "5f06608da76e0d49584f75dc",
        "id": 1,
        "nightly_fee": 71,
        "cleaning_fee": 70,
        "occupancy_tax_rate": 0.08600000000000001,
        "avg_rating": 4.34,
        "reviews": 623,
        "city": "Celiabury",
        "max_capacity": 3,
        "bookings": [
            {
                "guests": {
                    "adults": 2,
                    "children": 3,
                    "infants": 2
                },
                "_id": "5f06608da76e0d49584f75dd",
                "checkin": "2020-08-08T21:15:04.527Z",
                "checkout": "2020-08-11T08:30:51.584Z"
            }
        ],
        "__v": 0
    },
    {
        "_id": "5f0661091e5e0849c849727e",
        "id": 1,
        "nightly_fee": 183,
        "cleaning_fee": 46,
        "occupancy_tax_rate": 0.126,
        "avg_rating": 4.91,
        "reviews": 622,
        "city": "East Elyssa",
        "max_capacity": 6,
        "bookings": [
            {
                "guests": {
                    "adults": 2,
                    "children": 3,
                    "infants": 2
                },
                "_id": "5f0661091e5e0849c849727f",
                "checkin": "2020-08-09T07:28:38.700Z",
                "checkout": "2020-08-11T03:47:36.526Z"
            }
        ],
        "__v": 0
    },
    {
        "_id": "5f06618c7cfda84a43c499ea",
        "id": 1,
        "nightly_fee": 95,
        "cleaning_fee": 80,
        "occupancy_tax_rate": 0.085,
        "avg_rating": 3,
        "reviews": 639,
        "city": "Lemuelhaven",
        "max_capacity": 2,
        "bookings": [
            {
                "guests": {
                    "adults": 2,
                    "children": 3,
                    "infants": 2
                },
                "_id": "5f06618c7cfda84a43c499eb",
                "checkin": "2020-08-09T19:46:12.749Z",
                "checkout": "2020-08-14T01:21:32.322Z"
            }
        ],
        "__v": 0
    }
]
```

### Add place
  * POST `/api/places/:placeID/calendar`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "id": "Number",
        "nightly_fee": "Number",
        "cleaning_fee": "Number",
        "occupancy_tax_rate": "Number",
        "avg_rating": "Number",
        "reviews": "Number",
        "city": "String",
        "max_capacity": "Number",
        "bookings": [{
          "checkin": "Date",
          "checkout": "Date",
          "guests": {
            "adults": "Number",
            "children": "Number",
            "infants": "Number",
          },
        }],
    }
```


### Update the accomodation booking info
  * PATCH `/api/places/:placeID/calendar`

**Path Parameters:**
  * `placeID` place id

**Success Status Code:** `204`

**Request Body**: Expects JSON with following keys to add new booked data with number of the guests, adults, children, infants.

```json
    {
      "checkin": "Date",
      "checkout": "Date",
      "guests": {
        "adults": "Number",
        "children": "Number",
        "infants": "Number",
      }
    }
```

### Delete one place from database
  * DELETE `/api/places/:placeId/calendar`

**Path Parameters:**
  * `placeId` place id

**Success Status Code:** `204`