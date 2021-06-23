# restify-crud

A simple CRUD app built using `restify` and `typescript`.

## Installing and Setup

```
npm install
```

```
npm run start:dev
```

## Routes

- `GET /transactions`
- `POST /transactions`
  - Payload: `{ type: "credit" | "debit", amount: 100 }`
- `DELETE /transactions/:id`
- `GET /account/current-balance`

Make sure to send the header `Content-Type: application/json` with each request.
