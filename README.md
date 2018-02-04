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

##### `GET /problem?name=[name]`
Returns information on the problem with a given name
```bash
curl https://api.codus.arkis.io/problem?name=Sum
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

##### `GET /problems?category=[name]`
Returns information on all the problems in a given category
```bash
curl https://api.codus.arkis.io/problem?category=warmup
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
  ...
]
```



### User info

##### `GET /userinfo` *requires Authorization*
Used for debugging purposes. Returns all of the user information that is encoded in the request.
```bash
curl -H "Authorization: Bearer ACCESS_TOKEN_HERE" https://api.codus.arkis.io/userinfo
```
```json
{
  "iss": "https://codus.auth0.com/",
  "sub": "auth0|123456",
  "aud": [
    "https://api.codus.arkis.io/",
    "https://codus.auth0.com/userinfo"
  ],
  "iat": 1514764800,
  "exp": 1514772000,
  "azp": "client_id_here",
  "scope": "openid profile email"
}
```

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
    ...
  ]
}
```

##### `GET /solution?problem=[name]` *requires Authorization*
Returns stored information on the user's solution to a given problem
```bash
curl -H "Authorization: Bearer ACCESS_TOKEN_HERE" https://api.codus.arkis.io/solution?problem=Sum
```
```json
{
  "name": "Sum",
  "code": "\npublic class Sum {\n\n  public int main(int a, int b) {\n    return a + b;\n  }\n\n}\n\n",
  "passed": true
}
```
