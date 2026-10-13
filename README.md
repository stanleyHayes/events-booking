# events-booking

events booking is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose. Source modules cover `authentication`, `events`, `reservations`, `users`, `event`, `reservation`, `user`.

## Repository layout

- `controllers/` — 4 tracked file(s); source examples: `controllers/authentication.js`, `controllers/events.js`.
- `middleware/` — 1 tracked file(s); source examples: `middleware/authentication.js`.
- `models/` — 3 tracked file(s); source examples: `models/event.js`, `models/reservation.js`.
- `routes/` — 4 tracked file(s); source examples: `routes/authentication.js`, `routes/events.js`.
- `utils/` — 2 tracked file(s); source examples: `utils/constants.js`, `utils/token-utils.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/events-booking.git
cd events-booking
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `npm run dev` — runs the declared `dev` script (`nodemon index.js`).
- `npm run start` — runs the declared `start` script (`node index.js`).
- `npm run test` — runs the declared `test` script (`jest --watch --coverage`).

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [controllers/authentication.js](controllers/authentication.js)
- [controllers/events.js](controllers/events.js)
- [controllers/reservations.js](controllers/reservations.js)
- [controllers/users.js](controllers/users.js)
- [index.js](index.js)
- [middleware/authentication.js](middleware/authentication.js)
- [models/event.js](models/event.js)
- [models/reservation.js](models/reservation.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
