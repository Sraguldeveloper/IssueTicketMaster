import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { StoreService } from '../store.service';
interface TicketDetails{
    title: string,
    description:string
    priority:string
    status:string
    assignee:string
}
@Component({
  selector: 'app-ticket-create-edit',
  templateUrl: './ticket-create-edit.component.html',
  styleUrls: ['./ticket-create-edit.component.css']
})
export class TicketCreateEditComponent {
  ticketForm: FormGroup;
  isEditMode = false;
  ticketId: string | null = null;
  users:string[]= ['John Doe', 'Jane Smith', 'Sarah Connor', 'Tom Hardy']; // Example users

  constructor(private fb: FormBuilder, private route: ActivatedRoute,private api:ApiService,private store:StoreService) {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
      assignee: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('id');
      this.isEditMode = !!this.ticketId;

      if (this.isEditMode) {
        this.loadTicketData(this.ticketId);
      }
    });
  }

  loadTicketData(ticketId: string|null): void {
    const ticket = {
      title: 'Example Ticket',
      description: 'This is an example ticket.',
      priority: 'high',
      status: 'open',
      assignee: 'John Doe',
    };

    this.ticketForm.patchValue(ticket);
  }
  resetForm(){
    this.ticketForm.reset({
      title: '',
      description: '',
      priority: '',
      status: '',
      assignee: ''
    });
  }
  onSubmit(): void {
    if (this.ticketForm.valid) {
      console.log(this.ticketForm.value)
      let ticketId = this.store.generateUIID()
      const ticketData = {id:ticketId,...this.ticketForm.value}
      if (this.isEditMode) {
        console.log('Updating ticket:', ticketData);
      } else {
        this.api.addTicket(ticketData).subscribe({next:(value:TicketDetails)=>{
          if(value){
            console.log(value)
          }
        },error:(error:Error)=>{
          console.log(error.message)
        }})
      }
    }
  }
}
