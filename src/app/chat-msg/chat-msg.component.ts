import { Component, Input, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";

@Component({
  selector: "chat-msg",
  templateUrl: "./chat-msg.component.html",
  styleUrls: ["./chat-msg.component.css"]
})
export class ChatMsgComponent implements OnInit {
  @Input() msg: object;
  public isVisible = false;
  constructor(public dataService: DataService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
    }, 0);
  }

  btn_Click(msg) {
    this.dataService.converse(msg);
  }
}
