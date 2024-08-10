import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_URL, TICKET_LIST_PATH } from 'src/Constants/constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getTickets():Observable<any>{
    return this.http.get(`${SERVER_URL}${TICKET_LIST_PATH}`)
  }
  addTicket(ticketDetails:any):Observable<any>{
    return this.http.post(`${SERVER_URL}${TICKET_LIST_PATH}`,ticketDetails)
  }
  deleteTicket(ticketDetails:any):Observable<any>{
    return this.http.delete(`${SERVER_URL}${TICKET_LIST_PATH}/${ticketDetails}`)
  }
}
