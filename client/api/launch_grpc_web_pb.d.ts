import * as grpcWeb from 'grpc-web';

import * as launch_pb from './launch_pb';


export class LaunchServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createUser(
    request: launch_pb.UserCreateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: launch_pb.UserResponse) => void
  ): grpcWeb.ClientReadableStream<launch_pb.UserResponse>;

  deleteUser(
    request: launch_pb.UserDeleteRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: launch_pb.UserResponse) => void
  ): grpcWeb.ClientReadableStream<launch_pb.UserResponse>;

  createLaunch(
    request: launch_pb.LaunchCreateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: launch_pb.LaunchResponse) => void
  ): grpcWeb.ClientReadableStream<launch_pb.LaunchResponse>;

  deleteLaunch(
    request: launch_pb.LaunchDeleteRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: launch_pb.LaunchResponse) => void
  ): grpcWeb.ClientReadableStream<launch_pb.LaunchResponse>;

  listLaunch(
    request: launch_pb.ListLaunchRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: launch_pb.ListLaunchResponse) => void
  ): grpcWeb.ClientReadableStream<launch_pb.ListLaunchResponse>;

}

export class LaunchServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createUser(
    request: launch_pb.UserCreateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<launch_pb.UserResponse>;

  deleteUser(
    request: launch_pb.UserDeleteRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<launch_pb.UserResponse>;

  createLaunch(
    request: launch_pb.LaunchCreateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<launch_pb.LaunchResponse>;

  deleteLaunch(
    request: launch_pb.LaunchDeleteRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<launch_pb.LaunchResponse>;

  listLaunch(
    request: launch_pb.ListLaunchRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<launch_pb.ListLaunchResponse>;

}

