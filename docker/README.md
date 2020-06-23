# Various docker utils for mchview

The content of this directory should definitely be revised, but the idea is to gather the `Dockerfile` required to build the images of the APIs MchView is using :

- ccdb to wrap the original CCDB (Java) server
- ccdb-json for a middleman server that serves JSON objects by reading Root objects from the CCDB


```
├── build-ccdb.sh
├── ccdb-json.dockerfile
├── ccdb.dockerfile
└── docker-compose.yml
```


