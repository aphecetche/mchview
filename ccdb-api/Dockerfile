# FROM alpine:3.7 as build
#
# RUN apk add --no-cache curl 
# WORKDIR /ccdb
#
# RUN curl -O http://alimonitor.cern.ch/download/local.jar
#
FROM openjdk:8-jdk-alpine as builder
COPY ccdb-local/ /ccdb-local
WORKDIR /ccdb-local/package
RUN apk add bash 
RUN ./package.sh

FROM openjdk:8-jre-alpine as app
COPY --from=builder /ccdb-local/package/local.jar /local.jar
ENV TOMCAT_ADDRESS=*
ENV FILE_REPOSITORY_LOCATION=/ccdb/data
ENV TOMCAT_DEBUG=2
CMD ["/usr/bin/java", "-jar","/local.jar"]

