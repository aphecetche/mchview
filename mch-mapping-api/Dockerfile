FROM golang:alpine as builder

RUN apk add git

WORKDIR /go/src/github.com/aphecetche

RUN git clone https://github.com/aphecetche/pigiron

RUN cd /go/src/github.com/aphecetche/pigiron && go get ./...

RUN cd /go/src/github.com/aphecetche/pigiron && go install ./...

FROM alpine:3.7 

COPY --from=builder /go/bin/mch-mapping-api /mch-mapping-api

CMD ["/mch-mapping-api"]
