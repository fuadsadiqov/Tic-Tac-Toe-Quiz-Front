import { Component } from '@angular/core';
import { User, UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../../components/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] = [];
  loading = true;

  constructor(
    private userService: UserService,
    private confirmService: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  confirmDelete(userId: number) {
    this.confirmService.confirm({
      title: 'Delete User',
      message: 'Are you sure you want to delete this user?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    }).then((result: any) => {
      if (result) this.deleteUser(userId);
    });
  }

  deleteUser(userId: number) {
    this.userService.delete(userId).subscribe(() => {
      this.users = this.users.filter(u => u.id !== userId);
    });
  }

}
