A proof-of-concept of a single page application version of mchview.

To package the thing into a docker stuff, you must first create a `.env` file
with all the relevant ports defined :

```
CCDB_JSON_API_PORT=4343
CCDB_API_PORT=6565
MCH_MAPPING_API_PORT=3333
MCHVIEW_PORT=5678
```

(not completely satisfied with that, but that will do for the moment)

Then `npm run build`

Then `docker-compose build`

Then launch the thing with `docker-compose up -d`

