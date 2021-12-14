FROM golang:1.16-alpine

WORKDIR /app


COPY ./launch/go.mod ./
COPY ./launch/go.sum ./
RUN go mod download
COPY ./launch ./
RUN go build -o launch ./server

EXPOSE 50051

CMD [ "./launch" ]