import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'passport-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
  standalone: true,
  imports: [NzButtonModule, NzCardModule, NzGridModule, NzTypographyModule]
})
export class LandingComponent {
  private router = inject(Router);

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
