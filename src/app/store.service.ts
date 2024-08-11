import { Conditional } from '@angular/compiler';
import { Component, Inject, inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarRef,
  MatSnackBarModule,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog) {}

  generateUIID() {
    return uuidv4();
  }
  showNotification(message: string, state: string) {
    const panelClass = state === 'error' ? 'snackbar-error' : 'snackbar-success';
    this._snackBar.openFromComponent(NotificationComponent, {
      duration:2000,
      data: { message, state },
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
  showConfirmation(message:string):Observable<any>{
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {message},
    });
    return dialogRef.afterClosed()
  }
}



@Component({
  selector: 'notification',
  templateUrl: 'notification.html',
  styles: [
    `
      :host {
        display: flex;
      }

      .example-pizza-party {
        color: hotpink;
      }
      .snackbar-error {
        .mdc-snackbar__surface {
          background-color: red !important;
        }

        .mdc-snackbar__label {
          color: white !important;
        }
      }
      .snackbar-success {
        .mdc-snackbar__surface {
          background-color: yellowgreen !important;
        }

        .mdc-snackbar__label {
          color: white !important;
        }
      }
    `,
  ]
})
export class NotificationComponent {
  message!: string;
  snackBarRef = inject(MatSnackBarRef);
  constructor(
    private notifRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.message = data.message;
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'confirmationDialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogOverviewExampleDialog {
  confirmationMessage:string|undefined
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data:{message:string},
  ) {
    this.confirmationMessage = data.message
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}