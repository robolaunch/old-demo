import * as grpcWeb from 'grpc-web';

import * as feedback_pb from './feedback_pb';


export class FeedbackServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  sendFeedback(
    request: feedback_pb.CommentRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: feedback_pb.CommentResponse) => void
  ): grpcWeb.ClientReadableStream<feedback_pb.CommentResponse>;

  listFeedback(
    request: feedback_pb.ListFeedbackRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: feedback_pb.ListFeedbackResponse) => void
  ): grpcWeb.ClientReadableStream<feedback_pb.ListFeedbackResponse>;

}

export class FeedbackServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  sendFeedback(
    request: feedback_pb.CommentRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<feedback_pb.CommentResponse>;

  listFeedback(
    request: feedback_pb.ListFeedbackRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<feedback_pb.ListFeedbackResponse>;

}

