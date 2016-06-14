'use strict';
 
// This is a basic file, written in Ecmascript 6

class MainController {
	
    constructor() {
		let items = this.restoreItems();
		if (items == undefined) {
			this.todos = [
				{text:'learn angular', done:true},
				{text:'build an angular app', done:false}
			];
			this.storeItems();
		} else {
			this.todos = items;
		}
		
		this.todoText = '';
    }
	
	addTodo() {
      this.todos.push({text:this.todoText, done:false});
	  this.storeItems();
      this.todoText = '';
    };
 
    remaining() {
      let count = 0;
      angular.forEach(this.todos, (todo) => {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
	
	archive() {
      var oldTodos = this.todos;
      this.todos = [];
      angular.forEach(oldTodos, (todo) => {
			if (!todo.done)
				this.todos.push(todo);
		});
	  this.storeItems();
    };
	
	storeItems() {
		localStorage.setItem('todoItems', angular.toJson(this.todos));
	}
	
	restoreItems() {
		let items = localStorage.getItem('todoItems');
		if (items != null)
			return JSON.parse(items);
		else
			return undefined;
	}
	
}


// Note that this has to go after MainController has been declared
angular.module('todoApp', [])
	.controller('TodoListController', MainController);
