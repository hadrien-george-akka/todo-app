# TodoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

You can test it on live demo here : 
[DEMO HERE](https://hadrien-george-akka.github.io/todo-app/)


# Context
Our fantastic product owner has a wonderful, amazing and revolutionary idea... he wants to build a new Todo application. 
He has a good idea of the application behavior and comes with a backlog containing the following user stories :

# User stories


## 1 : List my TODOs

### Description :
As a user I would like to list my current todos
### Acceptance criterias :
- Each todo could have, at minimal, a related state and title
- Some hard-coded todos will be initialized in this context to demonstrate the tool 

## 2 : Change a TODO state

### Description :
As a user I would like to change a todo state by checking a "box"
### Acceptance criterias :
- When a todo is done, it should be placed at the bottom of the list and should be crossed out

## 3 : Detail and Update a TODO

### Description :
As a user I would like to display one of my todo in a separate or dedicated view.
As a user I would like to update one of my todo in a separate or dedicated view.
This todo will contain its title and a description (which is a new information not shown in the previous view).
### Acceptance criterias :
- We can click on a todo (by any way) to access the details view of the todo
- We can click on a todo (by any way) to access the updates view of the todo
- The todo could be accessed via a unique URL

## 4 : Add a new TODO

### Description :
As a user I would like to add a new todo in my list
### Acceptance criterias :
- The todo title is required
- The todo description can be empty
- The newly created todo has to be on top of the list of todos
- You are free to choose the design / interaction 

## 5 : Delete a TODO

### Description :
As a user I would like to delete a todo in my list
### Acceptance criterias :
- We can click on a todo (by any way) to delete the todo
- You are free to choose the design / interaction 

# Technical environment
You're working in the I4DWeb Team which provides the following technical recommendations :
- The application should be based on Angular Framework
- The project should rely on NgRx for state management 
- To keep the UI simple, the use of Material components is highly recommended (material.angular.io)
- Code quality is very important, so all the code has to be covered by unit tests
- Each user story should be realized in its own commit on master
- The product owner is curious and likes to read the application code on Github and test it via Github Pages

# Bonus
You can add any new functionality in this wonderful project if you want to, in order to satisfy your PO 
