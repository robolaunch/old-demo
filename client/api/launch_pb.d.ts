import * as jspb from 'google-protobuf'



export class User extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): User;

  getPassword(): string;
  setPassword(value: string): User;

  getEmail(): string;
  setEmail(value: string): User;

  getOrganization(): string;
  setOrganization(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    username: string,
    password: string,
    email: string,
    organization: string,
  }
}

export class UserCreateRequest extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): UserCreateRequest;
  hasUser(): boolean;
  clearUser(): UserCreateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCreateRequest): UserCreateRequest.AsObject;
  static serializeBinaryToWriter(message: UserCreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCreateRequest;
  static deserializeBinaryFromReader(message: UserCreateRequest, reader: jspb.BinaryReader): UserCreateRequest;
}

export namespace UserCreateRequest {
  export type AsObject = {
    user?: User.AsObject,
  }
}

export class UserDeleteRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): UserDeleteRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserDeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserDeleteRequest): UserDeleteRequest.AsObject;
  static serializeBinaryToWriter(message: UserDeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserDeleteRequest;
  static deserializeBinaryFromReader(message: UserDeleteRequest, reader: jspb.BinaryReader): UserDeleteRequest;
}

export namespace UserDeleteRequest {
  export type AsObject = {
    username: string,
  }
}

export class UserResponse extends jspb.Message {
  getIsOk(): boolean;
  setIsOk(value: boolean): UserResponse;

  getUser(): User | undefined;
  setUser(value?: User): UserResponse;
  hasUser(): boolean;
  clearUser(): UserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserResponse): UserResponse.AsObject;
  static serializeBinaryToWriter(message: UserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserResponse;
  static deserializeBinaryFromReader(message: UserResponse, reader: jspb.BinaryReader): UserResponse;
}

export namespace UserResponse {
  export type AsObject = {
    isOk: boolean,
    user?: User.AsObject,
  }
}

export class Launch extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): Launch;

  getName(): string;
  setName(value: string): Launch;

  getRobotType(): string;
  setRobotType(value: string): Launch;

  getNamespace(): string;
  setNamespace(value: string): Launch;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Launch.AsObject;
  static toObject(includeInstance: boolean, msg: Launch): Launch.AsObject;
  static serializeBinaryToWriter(message: Launch, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Launch;
  static deserializeBinaryFromReader(message: Launch, reader: jspb.BinaryReader): Launch;
}

export namespace Launch {
  export type AsObject = {
    username: string,
    name: string,
    robotType: string,
    namespace: string,
  }
}

export class LaunchCreateRequest extends jspb.Message {
  getLaunch(): Launch | undefined;
  setLaunch(value?: Launch): LaunchCreateRequest;
  hasLaunch(): boolean;
  clearLaunch(): LaunchCreateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LaunchCreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LaunchCreateRequest): LaunchCreateRequest.AsObject;
  static serializeBinaryToWriter(message: LaunchCreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LaunchCreateRequest;
  static deserializeBinaryFromReader(message: LaunchCreateRequest, reader: jspb.BinaryReader): LaunchCreateRequest;
}

export namespace LaunchCreateRequest {
  export type AsObject = {
    launch?: Launch.AsObject,
  }
}

export class LaunchDeleteRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): LaunchDeleteRequest;

  getName(): string;
  setName(value: string): LaunchDeleteRequest;

  getNamespace(): string;
  setNamespace(value: string): LaunchDeleteRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LaunchDeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LaunchDeleteRequest): LaunchDeleteRequest.AsObject;
  static serializeBinaryToWriter(message: LaunchDeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LaunchDeleteRequest;
  static deserializeBinaryFromReader(message: LaunchDeleteRequest, reader: jspb.BinaryReader): LaunchDeleteRequest;
}

export namespace LaunchDeleteRequest {
  export type AsObject = {
    username: string,
    name: string,
    namespace: string,
  }
}

export class LaunchResponse extends jspb.Message {
  getIsOk(): boolean;
  setIsOk(value: boolean): LaunchResponse;

  getLaunch(): Launch | undefined;
  setLaunch(value?: Launch): LaunchResponse;
  hasLaunch(): boolean;
  clearLaunch(): LaunchResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LaunchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LaunchResponse): LaunchResponse.AsObject;
  static serializeBinaryToWriter(message: LaunchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LaunchResponse;
  static deserializeBinaryFromReader(message: LaunchResponse, reader: jspb.BinaryReader): LaunchResponse;
}

export namespace LaunchResponse {
  export type AsObject = {
    isOk: boolean,
    launch?: Launch.AsObject,
  }
}

