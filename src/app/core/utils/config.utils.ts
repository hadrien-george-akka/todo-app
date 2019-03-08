import { MatSnackBarConfig } from '@angular/material';

/**
 * General application configuration of the Angular Material Snackbar duration (ms)
 */
const snackBarDuration = 2500;

/**
 * Custom snackbar options
 */
export const snackbarConfig: MatSnackBarConfig = {
  duration: snackBarDuration,
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
  panelClass: 'snack-bar-custom'
};
