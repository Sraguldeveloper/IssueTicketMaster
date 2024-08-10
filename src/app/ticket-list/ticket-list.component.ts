import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
export interface Ticket {
  title: string;
  status: string;
  priority: string;
  assignedUser: string;
}


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
showMessage:boolean=true
edit(arg0: any) {
throw new Error('Method not implemented.');
}
delete(ticketId: any) {
  this.apiService.deleteTicket(ticketId.id).subscribe((res:any)=>{
    console.log(res)
  })
}
  displayedColumns: string[] = ['id','title', 'status', 'priority', 'assignedUser','action'];

  dataSource = new MatTableDataSource<Ticket>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private apiService: ApiService) {}
  
  ngOnInit() {
    this.apiService.getTickets().subscribe((res: Ticket[]) => {
      console.log(res)
      if(res.length>0){
        this.showMessage=false
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
    this.dataSource.filterPredicate = (data: Ticket, filter: string) => data.status.toLowerCase().includes(filter);
    this.dataSource.filter = status.trim().toLowerCase();
  }
  
  applyPriorityFilter(priority: string) {
    this.dataSource.filterPredicate = (data: Ticket, filter: string) => data.priority.toLowerCase().includes(filter);
    this.dataSource.filter = priority.trim().toLowerCase();
  }
}
