import { Injectable } from "@angular/core";

// Ai api Client
import { ApiAiClient } from "../client/ApiAiClient";

// RxJs modules
import { BehaviorSubject } from "rxjs";

export class Message {
  constructor(public content: string, public sendBy: ESendBy) {}
}

export enum ESendBy {
  user = "user",
  bot = "bot",
  button = "button",
  image = "image"
}

@Injectable({
  providedIn: "root"
})
export class DataService {
  private client;
  private msg_cnt;

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {
    this.msg_cnt = 1;
  }

  public converse(msg: string) {
    const userMessage = new Message(msg, ESendBy.user);
    this.update(userMessage);

    return this.client.textRequest(msg).then(res => {
      // chat bot message count
      let res_cnt = Object.keys(res).length;
      // prev message count and respose chat bot message diff_cnt
      let diff_cnt = res_cnt - this.msg_cnt;

      // const speech = res.result.fulfillment.speech;
      let speech = "";
      // const botMessage = new Message(speech, ESendBy.bot);
      let botMessage;

      for (let index = 0; index < diff_cnt; index++) {
        switch (res[this.msg_cnt + index].message.type) {
          case "text":
            speech = res[this.msg_cnt + index].message.text;
            botMessage = new Message(speech, ESendBy.bot);
            this.update(botMessage);
            break;
          case "button":
            let btn_cnt = Object.keys(res[this.msg_cnt + index].message.buttons)
              .length;
            for (let btn_index = 0; btn_index < btn_cnt; btn_index++) {
              speech =
                res[this.msg_cnt + index].message.buttons[btn_index].title;
              botMessage = new Message(speech, ESendBy.button);
              this.update(botMessage);
            }
            break;
          case "image":
            speech = res[this.msg_cnt + index].message.image;
            botMessage = new Message(speech, ESendBy.image);
            this.update(botMessage);
            break;
          default:
            speech = "What do you want correctly?";
            botMessage = new Message(speech, ESendBy.bot);
            this.update(botMessage);
            break;
        }
      }
      this.msg_cnt = res_cnt + 1;
    });
  }

  public update(msg: Message) {
    this.conversation.next([msg]);
  }

  public init(token: string) {
    this.client = new ApiAiClient({ accessToken: token });
  }
}
