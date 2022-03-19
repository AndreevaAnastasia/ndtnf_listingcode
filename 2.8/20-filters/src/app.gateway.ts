import {MessageBody, SubscribeMessage, WebSocketGateway, WsException, WsResponse} from '@nestjs/websockets';
import {UseFilters, UsePipes} from "@nestjs/common";
import { WsExceptionFilter } from "./ws.exception.filter";
import {AgeValidationPipe} from "./age.validation.pipe";

@WebSocketGateway({ cors: true })
export class AppGateway {

  @UseFilters(new WsExceptionFilter)
  @SubscribeMessage('produce-error')
  handleMessage(client: any, payload: any): string {
    throw new WsException('Ooops!');

    return 'Hello world!';
  }

  @SubscribeMessage('get-age')
  handleAge(
      @MessageBody('age', AgeValidationPipe) age: string,
      client: any,
      payload: any
  ): WsResponse<string> {
    return { event: 'age', data: age };
  }
}
