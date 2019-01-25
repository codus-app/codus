# `codus-engine`
> The server-side engine powering Codus.

The Codus Engine is responsible for making database queries and orchestrating execution containers
in response to authenticated user requests coming from the [client app](https://github.com/codus-app/codus/tree/master/app).

# Development
`codus-engine` depends on having a MongoDB server running as well as having a correctly-configured Auth0 account. In its default configuration, Codus will run pointing at the instance of `codus-engine` that's configured and running on `codus.io`.


# API documentation
The Codus Engine exposes a web interface for reading and manipulating data.

### Authentication
Some requests require an auth0 access token to be passed with the request as an Authorization
header. This token can be obtained by going through the login process in
[the front-end](https://github.com/codus-app/codus).

## Endpoints



### Querying info

##### `GET /categories`
Returns basic information on each category. Includes problem names but not the full set of info on
each problem.
```bash
curl https://engine.codus.io/api/categories
```
```json
{
  "data": [
    {
      "displayName": "Warmup Problems",
      "name": "warmup",
      "description": {
        "md": "Some simple, easy warmup problems to get you started",
        "html": "<p>Some simple, easy warmup problems to get you started</p>\n"
      },
      "problems": [
        { "name": "AddOne" },
        ...
      ]
    },
    ...
  ]
}
```

##### `GET /category/[name]`
Returns information on the category with the given name
```bash
curl https://engine.codus.io/api/category/warmup
```
```json
{
  "data": {
    "displayName": "Warmup Problems",
    "name": "warmup",
    "description": {
      "md": "Some simple, easy warmup problems to get you started",
      "html": "<p>Some simple, easy warmup problems to get you started</p>\n"
    },
    "problems": [
      { "name": "AddOne" },
      { "name": "Invert" },
      ...
    ]
  }
}
```

##### `GET /problem/[category]/[name]`
Returns information on the problem with a given name
```bash
curl https://engine.codus.io/api/problem/warmup/Sum
```
```json
{
  "data": {
    "category": {
      "displayName": "Warmup Problems",
      "name": "warmup",
      "description": { ... }
    },
    "name": "Sum",
    "description": {
      "md": "Given two integers, `a` and `b`, return their sum.",
      "html": "<p>Given two integers, <code>a</code> and <code>b</code>, return their sum.</p>\n"
    },
    "resultType": "int",
    "parameters": [
      { "name": "a", "type": "int" },
      { "name": "b", "type": "int" },
      ...
    ],
    "testCases": [
      {
        "parameters": [1, 2],
        "result": 3
      },
      {
        "parameters": [3, 4],
        "result": 7
      },
      ...
    ],
    "numHidden": 4
  }
}
```




### Authenticated user actions

##### `GET /user` *requires Authorization*
Dumps all information stored in the database for the authenticated user
```bash
curl -H "Authorization: Bearer ACCESS_TOKEN_HERE" https://engine.codus.io/api/user
```
```json
{
  "auth0_id": "auth0|123456",
  "solutions": [
    {
      "category": "warmup",
      "name": "Sum",
      "code": "\npublic class Sum {\n\n  public int main(int a, int b) {\n    return a + b;\n  }\n\n}\n\n",
      "passed": true
    }
  ]
}
```

##### `GET /userinfo` *requires Authorization*
Queries the Auth0 Management API for the authenticated user and dumps all info
```bash
curl -H "Authorization: Bearer ACCESS_TOKEN_HERE" https://engine.codus.io/api/userinfo
```
```json
{
  "email": "johndoe@example.com",
  "username": "johndoe",
  "email_verified": true,
  "user_id": "auth0|123456",
  "picture": "https://example.com/avatar.png",
  "nickname": "johndoe",
  "identities": [
    {
      "user_id": "123456",
      "provider": "auth0",
      "connection": "Username-Password-Authentication",
      "isSocial": false
    }
  ],
  "updated_at": "2018-01-01T00:00:00.000Z",
  "created_at": "2018-01-01T00:00:00.000Z",
  "name": "johndoe@example.com",
  "user_metadata": {
    "name": "John Doe"
  },
  "last_ip": "0.0.0.0",
  "last_login": "2018-01-01T00:00:00.000Z",
  "logins_count": 1
}
```

##### `GET /solution/[category]/[problemName]` *requires Authorization*
Returns stored information on the user's solution to a given problem
```bash
curl -H "Authorization: Bearer ACCESS_TOKEN_HERE" https://engine.codus.io/api/solution/warmup/Sum
```
```json
{
  "category": "warmup",
  "name": "Sum",
  "code": "\npublic class Sum {\n\n  public int main(int a, int b) {\n    return a + b;\n  }\n\n}\n\n",
  "passed": true
}
```

##### `PUT /solution/[category]/[problemName]` *requires Authorization*
Store a user's solution to a given problem
```bash
curl -X PUT -H "Authorization: Bearer ACCESS_TOKEN_HERE" -H "Content-Type: text/plain" -d "SOLUTION_HERE" https://engine.codus.io/api/solution/warmup/Sum
```
```json
{ "success": true }
```

##### `GET /check/[category]/[problemName]` *requires Authorization*
Executes the user's stored solution for the given problem and returns the results
```bash
curl -H "Authorization: Bearer ACCESS_TOKEN_HERE" https://engine.codus.io/api/check/warmup/Sum
```
```json
{
  "tests": [
    { "value": 8, "expected": 8, "pass": true },
    { "value": 3, "expected": 3, "pass": true }
  ],
  "pass": true
}
```
