import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayContainer, Overlay } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {

  /** Prefix of theme css class containing each theme */
  prefixClass = 'todo-app-theme';

  /** Default theme css class */
  defaultClass = '-green';

  /** Subject containing the current css theme class */
  colorClass$: BehaviorSubject<string> = new BehaviorSubject(this.prefixClass + this.defaultClass);

  /**
   * Component dependencies
   * @param overlayContainer Material CDK allows floating pannel to have style
   */
  constructor(
    private overlayContainer: OverlayContainer
  ) {
    const storageClass = localStorage.getItem('color-picker');

    if (storageClass) {
      overlayContainer.getContainerElement().classList.add(storageClass);
      this.colorClass$.next(storageClass);
    } else {
      overlayContainer.getContainerElement().classList.add(this.prefixClass + this.defaultClass);
    }
  }

  /**
   * Return the colorClass string behavious subject
   */
  getColorClass() {
    return this.colorClass$;
  }

  /**
   * Set the theme css class and store it in local storage
   * @param className Name of the theme css class to set
   */
  setColorClass(className: string): void {
    this.overlayContainer.getContainerElement().classList.forEach(css => {
      this.overlayContainer.getContainerElement().classList.remove(css);
    });

    this.overlayContainer.getContainerElement().classList.add(className);
    this.colorClass$.next(className);
    localStorage.setItem('color-picker', className);
  }
}
