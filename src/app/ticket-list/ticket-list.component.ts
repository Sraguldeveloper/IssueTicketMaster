import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { StoreService } from '../store.service';
import { DELETE_CONFIRMATION, STATE, TICKET_DELETED, TICKET_NOT_DELETED } from 'src/Constants/constant';
export interface Ticket {
  title: string;
  status: string;
  priority: string;
  assignedUser: string;
}

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
})
export class TicketListComponent implements OnInit {
  showMessage: boolean = true;

  displayedColumns: string[] = [
    'id',
    'title',
    'status',
    'priority',
    'assignedUser',
    'action',
  ];

  dataSource = new MatTableDataSource<Ticket>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private store: StoreService) {}

  ngOnInit() {
    this.apiService.getTickets().subscribe((res: Ticket[]) => {
      console.log(res);
      if (res.length > 0) {
        this.showMessage = false;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyStatusFilter(status: string) {
    this.dataSource.filterPredicate = (data: Ticket, filter: string) =>
      data.status.toLowerCase().includes(filter);
    this.dataSource.filter = status.trim().toLowerCase();
  }

  applyPriorityFilter(priority: string) {
    this.dataSource.filterPredicate = (data: Ticket, filter: string) =>
      data.priority.toLowerCase().includes(filter);
    this.dataSource.filter = priority.trim().toLowerCase();
  }
  edit(arg0: any) {
    throw new Error('Method not implemented.');
  }
  delete(ticketId: any) {
    this.store.showConfirmation(DELETE_CONFIRMATION).subscribe({next:(result)=>{
      if(result){
        this.apiService.deleteTicket(ticketId.id).subscribe({next:(res: any) => {
          this.store.showNotification(TICKET_DELETED,STATE.SUCCESS)
        },error:(err:Error)=>{
          this.store.showNotification(TICKET_NOT_DELETED,STATE.ERROR)
          console.error("Line76-Ticket_list",err.message)
        }});
      }
    }})
  }
}
