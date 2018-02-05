# codus-engine
The server-side engine powering Codus. The Codus Engine is responsible for making database queries
and orchestrating containers in response to authenticated user requests coming from the
[client](https://github.com/arkis/codus).

# API documentation
The Codus Engine exposes a web interface for reading and manipulating data.

### Authentication
Some requests require an auth0 access token to be passed with the request as an Authorization
header. This token can be obtained by going through the login process in
[the front-end](https://github.com/arkis/codus).

## Endpoints



### Querying info

##### `GET /problem/[name]`
Returns information on the problem with a given name
```bash
curl https://api.codus.arkis.io/problem/Sum
```
```json
{
  "name": "Sum",
  "category": "warmup",

  "parameters": [
    { "name": "a", "type": "Integer" },
    { "name": "b", "type": "Integer" }
  ],
  "resultType": "Integer",

  "testCases": [
    { "parameters": [5, 3], "result": 8 },
    { "parameters": [1, 2], "result": 3 }
  ]
}
```

##### `GET /category/[name]`
Returns information on all the problems in a given category
```bash
curl https://api.codus.arkis.io/category/warmup
```
```json
[
  {
    "name": "Sum",
    "category": "warmup",
    "parameters": [
      { "name": "a", "type": "Integer" },
      { "name": "b", "type": "Integer" }
    ],
    "resultType": "Integer",
    "testCases": [
      { "parameters": [5, 3], "result": 8 },
      { "parameters": [1, 2], "result": 3 }
    ]
  },

  {
    "name": "Difference",
    "category": "warmup",
    "parameters": [
      { "name": "a", "type": "Integer" },
      { "name": "b", "type": "Integer" }
    ],
    "resultType": "Integer",
    "testCases": [
      { "parameters": [5, 3], "result": 2 },
      { "parameters": [2, 1], "result": 1 }
    ]
  }
]
```



### Authenticated user actions

##### `GET /user` *requires Authorization*
Dumps all information stored in the database for the authenticated user
```bash
curl -H "Authorization: Bearer ACCESS_TOKEN_HERE" https://api.codus.arkis.io/user
```
```json
{
  "auth0_id": "auth0|123456",
  "solutions": [
    {
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
curl -H "Authorization: Bearer ACCESS_TOKEN_HERE" https://api.codus.arkis.io/userinfo
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

##### `GET /solution/[problemName]` *requires Authorization*
Returns stored information on the user's solution to a given problem
```bash
curl -H "Authorization: Bearer ACCESS_TOKEN_HERE" https://api.codus.arkis.io/solution/Sum
```
```json
{
  "name": "Sum",
  "code": "\npublic class Sum {\n\n  public int main(int a, int b) {\n    return a + b;\n  }\n\n}\n\n",
  "passed": true
}
```

##### `GET /check/[problemName]` *requires Authorization*
Executes the user's stored solution for the given problem and returns the results
```bash
curl -H "Authorization: Bearer ACCESS_TOKEN_HERE" https://api.codus.arkis.io/check/Sum
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
