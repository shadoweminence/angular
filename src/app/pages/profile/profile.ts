import { Component, computed, inject, OnInit } from '@angular/core';
import { profileActions } from '@app/shared/store/profile/profileActions';
import { profileFeatures } from '@app/shared/store/profile/profileFeatures';
import { Store } from '@ngrx/store';
import { ImageModule } from 'primeng/image';
import { Skeleton } from 'primeng/skeleton';
import { effect } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [ImageModule, Skeleton],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  private readonly store = inject(Store);
  private selectedProfile = this.store.selectSignal(profileFeatures.selectProfile);
  isLoading = this.store.selectSignal(profileFeatures.selectIsLoading);

  profile = computed(() => this.selectedProfile());

  ngOnInit(): void {
    if (this.profile() == null) {
      this.store.dispatch(profileActions.getProfile({ id: 1 }));
    }
  }
}
