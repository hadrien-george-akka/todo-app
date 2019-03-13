import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material';

import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerService, Favicons, BrowserFavicons, BROWSER_FAVICONS_CONFIG } from 'src/app/core/services/color-picker.service';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPickerComponent ],
      imports: [
        MatMenuModule,
      ],
      providers: [
        ColorPickerService,
        {
          provide: Favicons,
          useClass: BrowserFavicons
        },
        {
          provide: BROWSER_FAVICONS_CONFIG,
          useValue: browserFaviconsConfigTest
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export const browserFaviconsConfigTest = {
  icons: {
      greenlight: {
          type: 'image/png',
          href: './assets/greenlight.png',
          isDefault: true
      },
      redlight: {
          type: 'image/png',
          href: './assets/redlight.png'
      },
      reddark: {
        type: 'image/png',
        href: './assets/reddark.png'
      },
      yellow: {
        type: 'image/png',
        href: './assets/yellow.png'
      },
      orange: {
        type: 'image/png',
        href: './assets/orange.png'
      },
      greendark: {
        type: 'image/png',
        href: './assets/greendark.png'
      },
      cyanlight: {
        type: 'image/png',
        href: './assets/cyanlight.png'
      },
      cyandark: {
        type: 'image/png',
        href: './assets/cyandark.png'
      },
      bluelight: {
        type: 'image/png',
        href: './assets/bluelight.png'
      },
      bluedark: {
        type: 'image/png',
        href: './assets/bluedark.png'
      },
      purplelight: {
        type: 'image/png',
        href: './assets/purplelight.png'
      },
      purpledark: {
        type: 'image/png',
        href: './assets/purpledark.png'
      },
      grey: {
        type: 'image/png',
        href: './assets/grey.png'
      },
      black: {
        type: 'image/png',
        href: './assets/black.png'
      },
  },
  cacheBusting: true
};
