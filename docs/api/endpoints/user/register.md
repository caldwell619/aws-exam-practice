# Register Endpoint

## Method

Post

## Validation

### Identifier

- [x] Required
- `String`
- Pattern: `^[\S]{5,40}$` => any non-whitespace character between 5 and 40 characters
  - This is the partition key.
- Example: `email@email.com`

### Password

Plain text password to be hashed for storage in the database.

- [x] Required
- `String`
- Pattern: `^[\S]{6,30}$` => any non-whitespace character between 6 and 30 characters
- Example: `pa$$w0rd`

### FirstName

- [x] Required
- `String`
- Pattern: `^[\S]{1,50}$` => any non-whitespace character between 5 and 40 characters
  - This is the partition key.
- Example: `Bill`

### LastName

- [x] Required
- `String`
- Pattern: `^[\S]{1,50}$` => any non-whitespace character between 5 and 40 characters
  - This is the partition key.
- Example: `Nye`

## Request / Response

### Sample Request

```json
{
  "Identifier": "email@email.com",
  "FirstName": "Bill",
  "LastName": "Nye",
  "Password": "p@$$w0rd"
}
```

### Sample Response

```json
{
  "Identifier": "email@email.com",
  "FirstName": "Bill",
  "LastName": "Nye",
  "role": "user",
  "token": "JWT_STRING"
}
```
