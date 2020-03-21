import { Component } from "@angular/core";
import { Todo } from "src/models/todo.models";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public listTodo: Todo[] = [];
  public form: FormGroup;
  public mode: String = "list";

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])
      ]
    });
    this.load();
    //this.listTodo.push(new Todo(1, "todo1", false));
    //this.listTodo.push(new Todo(2, "todo2", false));
    //this.listTodo.push(new Todo(3, "todo3", false));
    //this.listTodo.push(new Todo(4, "todo4", true));
  }

  changeMode(mode: String) {
    this.mode = mode;
  }

  add() {
    const title = this.form.controls["title"].value;
    const id = this.listTodo.length + 1;
    this.listTodo.push(new Todo(id, title, false));
    this.save();
    this.clear();
    this.changeMode("list");
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.listTodo.indexOf(todo);
    if (index !== -1) {
      this.listTodo.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.listTodo);
    localStorage.setItem("ssm.todo", data);
  }

  load() {
    const data = localStorage.getItem("ssm.todo");
    const items = JSON.parse(data);
    if (items) {
      this.listTodo = items;
    }
  }
}
