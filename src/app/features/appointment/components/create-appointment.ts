import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserResponse } from '../../shared/dto/user-response';
import { UserService } from '../../auth/user/service/user.service';
import { ROLES } from '../../../shared/constants/roles.constants';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-appointment.html',
  styleUrls: ['./create-appointment.scss']
})
export class CreateAppointmentComponent implements OnInit {
  @Output() public closeModal = new EventEmitter<boolean>();

  public appointmentForm!: FormGroup;
  public clients: UserResponse[] = [];
  public nutritionists: UserResponse[] = [];
  public isSubmitting = false;
  public loadError: string | null = null;

  private _appointmentService = inject(AppointmentService);
  private _userService = inject(UserService);
  private _formBuilder = inject(FormBuilder);

  public ngOnInit(): void {
    this.appointmentForm = this._formBuilder.group({
      clientId: ['', Validators.required],
      nutritionistId: ['', Validators.required],
      appointmentDate: ['', Validators.required]
    });

    this.loadUsers();
  }

  public loadUsers(): void {
    this._userService
      .getUsers()
      .then((users) => {
        this.clients = users.filter((u) => u.role === ROLES.CLIENT);
        this.nutritionists = users.filter((u) => u.role === ROLES.NUTRITIONIST);
      })
      .catch((err) => {
        console.error(err);
        this.loadError = 'Could not load users';
      });
  }

  public cancel(): void {
    this.closeModal.emit(false);
  }

  public save(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    const appointmentData = this.appointmentForm.value;

    this.isSubmitting = true;

    this._appointmentService.createAppointment(appointmentData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeModal.emit(true);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        alert('Error creating appointment');
      }
    });
  }
}
