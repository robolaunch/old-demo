FROM golang:1.16-alpine

WORKDIR /app

COPY ./feedback/go.mod ./
COPY ./feedback/go.sum ./
RUN go mod download




COPY ./feedback ./
RUN go build -o feedback ./server

EXPOSE 50052

CMD [ "./feedback" ]