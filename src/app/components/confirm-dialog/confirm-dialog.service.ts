import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Subject, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  constructor(private appRef: ApplicationRef, private envInjector: EnvironmentInjector) {}

  async confirm(options: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
  }): Promise<boolean> {
    const componentRef: ComponentRef<ConfirmDialogComponent> = createComponent(ConfirmDialogComponent, {
      environmentInjector: this.envInjector
    });

    // Set options
    componentRef.instance.title = options.title || 'Confirm';
    componentRef.instance.message = options.message || 'Are you sure?';
    componentRef.instance.confirmText = options.confirmText || 'Delete';
    componentRef.instance.cancelText = options.cancelText || 'Cancel';

    // Append to DOM
    this.appRef.attachView(componentRef.hostView);
    document.body.appendChild(componentRef.location.nativeElement);

    // Subject for result
    const result$ = new Subject<boolean>();

    componentRef.instance.confirmed.subscribe((res: boolean) => {
      result$.next(res);
      result$.complete();

      // Cleanup
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    });

    // Wait for user action
    const result = await firstValueFrom(result$);
    return result;
  }
}
