import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(public dateService: DateService,
              private tasksService: TasksService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value
    console.log(title)
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YY')
    }
    this.tasksService.create(task).subscribe(task => { this.form.reset() }, err => { console.log('error') })
  }

}
