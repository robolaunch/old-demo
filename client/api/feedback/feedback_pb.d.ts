import * as jspb from 'google-protobuf'



export class Comment extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): Comment;

  getName(): string;
  setName(value: string): Comment;

  getComment(): string;
  setComment(value: string): Comment;

  getRating(): number;
  setRating(value: number): Comment;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Comment.AsObject;
  static toObject(includeInstance: boolean, msg: Comment): Comment.AsObject;
  static serializeBinaryToWriter(message: Comment, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Comment;
  static deserializeBinaryFromReader(message: Comment, reader: jspb.BinaryReader): Comment;
}

export namespace Comment {
  export type AsObject = {
    username: string,
    name: string,
    comment: string,
    rating: number,
  }
}

export class CommentRequest extends jspb.Message {
  getComment(): Comment | undefined;
  setComment(value?: Comment): CommentRequest;
  hasComment(): boolean;
  clearComment(): CommentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CommentRequest): CommentRequest.AsObject;
  static serializeBinaryToWriter(message: CommentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentRequest;
  static deserializeBinaryFromReader(message: CommentRequest, reader: jspb.BinaryReader): CommentRequest;
}

export namespace CommentRequest {
  export type AsObject = {
    comment?: Comment.AsObject,
  }
}

export class CommentResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CommentResponse): CommentResponse.AsObject;
  static serializeBinaryToWriter(message: CommentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentResponse;
  static deserializeBinaryFromReader(message: CommentResponse, reader: jspb.BinaryReader): CommentResponse;
}

export namespace CommentResponse {
  export type AsObject = {
  }
}

export class ListFeedbackRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListFeedbackRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListFeedbackRequest): ListFeedbackRequest.AsObject;
  static serializeBinaryToWriter(message: ListFeedbackRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListFeedbackRequest;
  static deserializeBinaryFromReader(message: ListFeedbackRequest, reader: jspb.BinaryReader): ListFeedbackRequest;
}

export namespace ListFeedbackRequest {
  export type AsObject = {
  }
}

export class ListFeedbackResponse extends jspb.Message {
  getCommentList(): Array<Comment>;
  setCommentList(value: Array<Comment>): ListFeedbackResponse;
  clearCommentList(): ListFeedbackResponse;
  addComment(value?: Comment, index?: number): Comment;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListFeedbackResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListFeedbackResponse): ListFeedbackResponse.AsObject;
  static serializeBinaryToWriter(message: ListFeedbackResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListFeedbackResponse;
  static deserializeBinaryFromReader(message: ListFeedbackResponse, reader: jspb.BinaryReader): ListFeedbackResponse;
}

export namespace ListFeedbackResponse {
  export type AsObject = {
    commentList: Array<Comment.AsObject>,
  }
}

