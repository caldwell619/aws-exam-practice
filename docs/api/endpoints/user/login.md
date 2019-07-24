# Login Endpoint

## Method

Post

## Validation

### Identifier

- [x] Required
- `String`
- Pattern: `^[\S]{5,40}$` => any non-whitespace character between 5 and 40 characters
  - This is the partition key.
- Example: `email@email.com`

### Description

- [x] Required
- `String`
- Pattern: `^[\S]{1,300}$` => any non-whitespace character between 1 and 300 characters
  - This is the range key.
- Example: `user_profile`

### Password

Plain text password to be evaluated against the hashed value in the database.

- [x] Required
- `String`
- Pattern: `^[\S]{6,30}$` => any non-whitespace character between 6 and 30 characters
- Example: `pa$$w0rd`

## Request / Response

### Sample Request

```json
{
	"Identifier": "email@email.com",
	"Password": "pa$$w0rd"
}
```

### Sample Response

```json
{
	"Identifier": "bill@nye.com",
	"Description": "user_profile",
	"LastName": "Nye",
	"FirstName": "Bill",
	"token": "TOKEN",
	"role": "user"
}
```

## Swagger

```json

```
