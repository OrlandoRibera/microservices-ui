import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { AppointmentResponse } from './dto/appointment-response';
import { AppointmentService } from './service/appointment.service';
import { CreateAppointmentComponent } from './components/create-appointment';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CreateAppointmentComponent],
  templateUrl: './appointment.html',
  styleUrls: ['./appointment.scss']
})
export class AppointmentComponent implements OnInit {
  public appointments: AppointmentResponse[] = [];
  public isLoading = false;
  public isCreatingAppointment = false;
  public error: string | null = null;

  private _appointmentService = inject(AppointmentService);
  private _authService = inject(AuthService);

  public ngOnInit(): void {
    this.loadAppointments();
  }

  public loadAppointments(): void {
    const nutritionistId = this._authService.getUserId();
    if (!nutritionistId) {
      this.error = 'User ID is missing';
      return;
    }

    this.isLoading = true;
    this._appointmentService.getAppointmentsByNutritionistId(nutritionistId).subscribe({
      next: (data) => {
        this.appointments = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load appointments';
        this.isLoading = false;
      }
    });
  }

  public createAppointment(): void {
    this.isCreatingAppointment = true;
  }

  public handleModalClose(refresh: boolean): void {
    this.isCreatingAppointment = false;
    if (refresh) {
      this.loadAppointments();
    }
  }
}
