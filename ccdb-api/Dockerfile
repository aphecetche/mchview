FROM alpine:3.7 as build

RUN apk add --no-cache curl 
WORKDIR /ccdb

RUN curl -O http://alimonitor.cern.ch/download/local.jar

FROM openjdk:8-jre-alpine as app
COPY --from=build /ccdb/local.jar /local.jar
ENV TOMCAT_PORT=6464
ENV TOMCAT_ADDRESS=*
ENV FILE_REPOSITORY_LOCATION=/ccdb/data
CMD ["/usr/bin/java", "-jar","/local.jar"]

