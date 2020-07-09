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
1. [Server API](#serverAPI)


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

### Get place info
  * GET `/api/places/:placeId`

**Path Parameters:**
  * `placeId` place id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
        "placeId": "Number",
        "nightlyFee": "Number",
        "cleaningFee": "Number",
        "occupancyTaxRate": "Number",
        "averateRating": "Number",
        "reviews": "Number",
        "locationCity": "String",
        "locationCountry": "String",
        "maxCapacity": "Number",
        "bookings": [
          {
            "bookingId": "Number",
            "checkin": "Date",
            "checkout": "Date",
          },
          {
            "bookingId": "Number",
            "checkin": "Date",
            "checkout": "Date",
          },
        ]
    },
```

### Get booking info
  * GET `/api/bookings/:bookingId`

**Path Parameters:**
  * `bookingId` place id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "bookingId": "Number",
      "checkin": "Date",
      "checkout": "Date",
      "maxCapacity": "Number",
      "adults": "Number",
      "children": "Number",
      "infants": "Number",
      "placeId": "Number",
      "nightlyFee": "Number",
      "cleaningFee": "Number",
      "occupancyTaxRate": "Number",
      "locationCity": "String",
      "locationCountry": "String",
    },
```

### Add a new booking to existing place
  * POST `/api/places/:placeId`

**Path Parameters:**
  * `placeId` place id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys to add a new booking to existing place

```json
    {
      "placeId": "Number",
      "nightlyFee": "Number",
      "cleaningFee": "Number",
      "occupancyTaxRate": "Number",
      "checkin": "Date",
      "checkout": "Date",
      "adults": "Number",
      "children": "Number",
      "infants": "Number",
    }
```

### Update the existing booking info
  * PUT `/api/booking/:bookingId`

**Path Parameters:**
  * `bookingId` booking id

**Success Status Code:** `204`

**Request Body**: Expects JSON with following keys to update the booking info of existing booking

```json
    {
      "bookingId": "Number",
      "checkin": "Date",
      "checkout": "Date",
      "adults": "Number",
      "children": "Number",
      "infants": "Number",
      "nightlyFee": "Number",
      "cleaningFee": "Number",
      "occupancyTaxRate": "Number",
    }
```

### Delete a place from database
  * DELETE `/api/places/:placeId`

**Path Parameters:**
  * `placeId` place id

**Success Status Code:** `204`

### Delete a booking from database
  * DELETE `/api/bookings/bookingId`

**Path Parameters:**
  * `bookingId` booking id

**Success Status Code:** `204`