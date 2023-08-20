# User Commands:
* Make a new user using POST: http://localhost:8181/api/users/register + a request body containing:
```
{
    "firstName" string, minimum length 2, maximum length 256, required,
    "middleName" string, minimum length 2
    "lastName" string, minimum length 2, maximum length 256, required
    "isBusiness" boolean,
    "phone" string, required,
    "email" string, required,
    "password" string, required,
    "state" string, minimum length 2,
    "country" string, minimum length 2, maximum length 256, required,
    "city" string, minimum length 2, maximum length 256, required,
    "street" string, minimum length 2, maximum length 256, required,
    "houseNumber" number, minimum length 1, required,
    "zip" number,
    "imageAlt" string, minimum length 2, maximum length 256,
    "imageUrl" string
}
```

* Login using POST: http://localhost:8181/api/users/login + request body containing:
```
{
    "email" string, required,
    "password" string, required
}
```

* Get all users using GET: http://localhost:8181/api/users/getAllUsers. This requires you to be an ADMIN.

* Get a your user info using GET: http://localhost:8181/api/users/userInfo/. This requires you to be logged in.

* Get a specific user using GET: http://localhost:8181/api/users/userInfo/:id + the user's ID. This requires you to be the same user or an ADMIN.

* Update a specific user using PUT: http://localhost:8181/api/users/update-user/:id + the user's ID + a request body containing:
```
{
    "firstName" string, minimum length 2, maximum length 256, required,
    "middleName" string, minimum length 2
    "lastName" string, minimum length 2, maximum length 256, required
    "isBusiness" boolean,
    "phone" string, required,
    "email" string, required,
    "state" string, minimum length 2,
    "country" string, minimum length 2, maximum length 256, required,
    "city" string, minimum length 2, maximum length 256, required,
    "street" string, minimum length 2, maximum length 256, required,
    "houseNumber" number, minimum length 1, required,
    "zip" number,
    "imageAlt" string, minimum length 2, maximum length 256,
    "imageUrl" string
}
```
This requires you to be the same user.

* Change a user's business status using PATCH: http://localhost:8181/api/users/change-biz/:id + the user's ID. This requires you to be the same user or an ADMIN.

* Delete a specific user using DELETE: http://localhost:8181/api/users/deleteUser/:id + the user's ID. This requires you to be an ADMIN.

# Plants Commands:
* Get all plants using GET: http://localhost:8181/api/plants.

* Get all plants that you created using GET: http://localhost:8181/api/cards/my-plants. This requires you to be the plant owner.

* Get all plants that you liked using GET: http://localhost:8181/api/cards/my-fav-plants. This requires you to be logged in.

* Get all plants that you added to your cart using GET: http://localhost:8181/api/cards/my-cart. This requires you to be logged in.

* Get a specific plant using GET: http://localhost:8181/api/plants/:id + the plant's ID.

* Make a add a new plant using POST: http://localhost:8181/api/plants + a request body containing:
```
{
    "title" string, minimum length 2, maximum length 256, required,
    "description" string, minimum length 2, maximum length 1024, required,
    "phone" string, required,
    "email" string, required,
    "web" string,
    "imageAlt" string, minimum length 2, maximum length 256,
    "imageUrl" string
}
```

* Update a specific plant using PUT: http://localhost:8181/api/plants/:id + the plant's ID + a request body containing:
```
{
    "title" string, minimum length 2, maximum length 256, required,
    "description" string, minimum length 2, maximum length 1024, required,
    "phone" string, required,
    "email" string, required,
    "web" string,
    "imageAlt" string, minimum length 2, maximum length 256,
    "imageUrl" string
}
```
This requires you to be the plant owner.

* Add or remove a like from a plant using PATCH: http://localhost:8181/api/plants/like-plant/:id + the plant's ID. This requires you to be logged in.

* Add or remove a plant from your cart using PATCH: http://localhost:8181/api/plants/add-to-cart/:id + the plant's ID. This requires you to be logged in.

* Delete a specific plant using DELETE: http://localhost:8181/api/plants/:id + the card's ID. This requires you to be the plant owner or an ADMIN.