import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { DateService } from '../shared/date.service';
import { TasksService } from '../shared/tasks.service';
import { Task } from '../shared/tasks.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.less']
})
export class OrganizerComponent implements OnInit {

  form!: FormGroup
  tasks: Task[] = []

  constructor(public dateService: DateService,
              private tasksService: TasksService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YY')
    }
    this.tasksService.create(task).subscribe(task => {
      this.tasks.push(task)
      this.form.reset() 
    }, err =>  console.log('error') )
  }

  remove(task: Task) {
    this.tasksService.remove(task).subscribe( () =>  {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, err => console.log(err))
  }

}
