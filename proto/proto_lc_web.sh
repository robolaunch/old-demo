protoc -I=launch launch.proto \
    --js_out=import_style=commonjs+dts:../client/api \
    --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:../client/api