# User Commands:
* Make a new user using POST: http://localhost:8181/api/users + a request body containing:
```
{
    "name":
    {
        "firstName" string, minimum length 2, maximum length 256, required,
        "middleName" string, minimum length 2
        "lastName" string, minimum length 2, maximum length 256, required
    },
    "isBusiness" boolean,
    "phone" string, required,
    "email" string, required,
    "password" string, required,
    "address":
    {
        "state" string, minimum length 2,
        "country" string, minimum length 2, maximum length 256, required,
        "city" string, minimum length 2, maximum length 256, required,
        "street" string, minimum length 2, maximum length 256, required,
        "houseNumber" number, minimum length 1, required,
        "zip" number, minimum length 4, required
    },
    "image":
    {
        "alt" string, minimum length 2, maximum length 256, required,
        "url" string
    }
}
```

* Login using POST: http://localhost:8181/api/users/login + request body containing:
```
{
    "email" string, required,
    "password" string, required
}
```

* Get all users using GET: http://localhost:8181/api/users. This requires you to be an ADMIN.

* Get a specific user using GET: http://localhost:8181/api/users/:id + the user's ID. This requires you to be the same user or an ADMIN.

* Update a specific user using PUT: http://localhost:8181/api/users/:id + the user's ID + a request body containing:
```
{
    "name":
    {
        "firstName" string, minimum length 2, maximum length 256, required,
        "middleName" string, minimum length 2,
        "lastName" string, minimum length 2, maximum length 256, required
    },
    "isBusiness" boolean,
    "phone" string, required,
    "email" string, required,
    "password" string, required,
    "address":
    {
        "state" string, minimum length 2,
        "country" string, minimum length 2, maximum length 256, required,
        "city" string, minimum length 2, maximum length 256, required,
        "street" string, minimum length 2, maximum length 256, required,
        "houseNumber" number, minimum length 1, required,
        "zip" number, minimum length 4, required
    },
    "image":
    {
        "alt" string, minimum length 2, maximum length 256, required,
        "url" string
    }
}
```
This requires you to be the same user.

* Change a user's business status using PATCH: http://localhost:8181/api/users/:id + the user's ID. This requires you to be the same user.

* Delete a specific user using DELETE: http://localhost:8181/api/users/:id + the user's ID. This requires you to be the same user or an ADMIN.

# Card Commands:
* Get all cards using GET: http://localhost:8181/api/cards.

* Get all cards that you created using GET: http://localhost:8181/api/cards/my-cards. This requires you to be the card owner.

* Get a specific card using GET: http://localhost:8181/api/cards/:id + the card's ID.

* Make a new card using POST: http://localhost:8181/api/cards + a request body containing:
```
{
    "title" string, minimum length 2, maximum length 256, required,
    "subTitle" string, minimum length 2, maximum length 256, required,
    "description" string, minimum length 2, maximum length 1024, required,
    "phone" string, required,
    "email" string, required,
    "web" string
    "address":
    {
        "state" string, minimum length 2,
        "country" string, minimum length 2, maximum length 256, required,
        "city" string, minimum length 2, maximum length 256, required,
        "street" string, minimum length 2, maximum length 256, required,
        "houseNumber" number, minimum length 1, required,
        "zip" number, minimum length 4, required
    },
    "image":
    {
        "alt" string, minimum length 2, maximum length 256, required,
        "url" string
    }
}
```

* Update a specific card using PUT: http://localhost:8181/api/cards/:id + the user's ID + a request body containing:
```
{
    "title" string, minimum length 2, maximum length 256, required,
    "subTitle" string, minimum length 2, maximum length 256, required,
    "description" string, minimum length 2, maximum length 1024, required,
    "phone" string, required,
    "email" string, required,
    "web" string
    "address":
    {
        "state" string, minimum length 2,
        "country" string, minimum length 2, maximum length 256, required,
        "city" string, minimum length 2, maximum length 256, required,
        "street" string, minimum length 2, maximum length 256, required,
        "houseNumber" number, minimum length 1, required,
        "zip" number, minimum length 4, required
    },
    "image":
    {
        "alt" string, minimum length 2, maximum length 256, required,
        "url" string
    }
}
```
This requires you to be the card owner.

* Add or remove a like from a card using PATCH: http://localhost:8181/api/cards/:id + the card's ID. This requires you to be a registered user.

* Delete a specific card using DELETE: http://localhost:8181/api/users/:id + the card's ID. This requires you to be the card owner or an ADMIN.