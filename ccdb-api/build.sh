#!/bin/sh

LOCAL_REPO_SRC=/Users/laurent/cernbox/ccdbs/local-repo-full

rm -rf ./ccdb-local
cp -a $HOME/gitlab.cern.ch/grigoras/ccdb-local .

VOL=vc_ccdb_data
docker volume rm $VOL > /dev/null 2>&1
docker volume create --name $VOL
docker run --rm -v $VOL:/ccdb/data -v $LOCAL_REPO_SRC:/tmp alpine:3.9 cp -aT /tmp /ccdb/data
