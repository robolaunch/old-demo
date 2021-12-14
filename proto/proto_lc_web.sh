protoc -I=launch launch.proto \
    --js_out=import_style=commonjs:../client/api/launch \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:../client/api/launch
                                                                            
protoc -I=launch launch.proto \
    --js_out=import_style=commonjs+dts:../client/api/launch \
    --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:../client/api/launch
