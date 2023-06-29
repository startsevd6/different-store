import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
  providedIn: "root",
})
export class errorService {
  error$ = new Subject<string>();

  handle(message: string) {
    this.error$.next(message);
  }

  clear() {
    this.error$.next("");
  }
}
