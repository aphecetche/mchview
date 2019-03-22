A proof-of-concept of a single page application version of mchview.

Local development is made using `npm install` (once) and then `npm start`.

To package the thing into a docker stuff, you must first create a `.env` file
with all the relevant ports defined :

```ini
CCDB_JSON_API_PORT=4343
CCDB_API_PORT=6565
MCH_MAPPING_API_PORT=3333
MCH_MAPPING_API=http://localhost:3333
MCHVIEW_PORT=5678
```

Then `npm run build`

Then `docker-compose build`

Then launch the thing with `docker-compose up -d`

Not all the variables in `.env` are needed for all cases. For instance, if only doing `docker compuse up -d mchview` then only :

- `MCHVIEW_PORT`
- `MCH_MAPPING_API`
- `MCH_MAPPING_API_PORT`

    are needed.
