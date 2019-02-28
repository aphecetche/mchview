FROM golang:alpine as builder

RUN apk add git

WORKDIR /go/src/github.com/alice-go

RUN git clone https://github.com/aphecetche/ocdb

RUN cd ocdb && git checkout serve-ocdb 

RUN go get ./...

RUN go install ./...

FROM alpine:3.7 as app

COPY --from=builder /go/bin/serve-ocdb /serve-ocdb


