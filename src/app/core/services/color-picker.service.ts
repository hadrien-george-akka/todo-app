import { Injectable, Inject, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {

  /** Prefix of theme css class containing each theme */
  prefixClass = 'todo-app-theme-';

  /** Default theme css class */
  defaultClass = 'greenlight';

  /** Subject containing the current css theme class */
  colorClass$: BehaviorSubject<string> = new BehaviorSubject(this.prefixClass + this.defaultClass);

  /**
   * Component dependencies
   * @param overlayContainer Material CDK allows floating pannel to have style
   */
  constructor(
    public overlayContainer: OverlayContainer,
  ) {

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

    const classTheme = this.prefixClass + className;
    this.addClassToOverlayContainer(classTheme);
    this.colorClass$.next(classTheme);

    localStorage.setItem('colorTheme', className);
  }

  addClassToOverlayContainer(className: string): void {
    this.overlayContainer.getContainerElement().classList.add(className);
  }
}

export interface IconConfig {
  type: string;
  href: string;
  isDefault?: boolean;
}

export interface IconsConfig {
  [ name: string ]: IconConfig;
}

export interface FaviconsConfig {
  icons: IconsConfig;
  cacheBusting?: boolean;
}

export const BROWSER_FAVICONS_CONFIG = new InjectionToken<FaviconsConfig>( 'Favicons Configuration' );

export abstract class Favicons {
  abstract activate( name: string ): void;
  abstract reset(): void;
}

export class BrowserFavicons implements Favicons {

  private elementId: string;
  private icons: IconsConfig;
  private useCacheBusting: boolean;

  constructor( @Inject( BROWSER_FAVICONS_CONFIG ) config: FaviconsConfig ) {

    this.elementId = 'favicons-service-injected-node';
    this.icons = Object.assign( Object.create( null ), config.icons );
    this.useCacheBusting = ( config.cacheBusting || false );

    this.removeExternalLinkElements();

  }

  public activate( name: string ): void {
    if ( ! this.icons[ name ] ) {
      throw( new Error( `Favicon for [ ${ name } ] not found.` ) );
    }

    this.setNode( this.icons[ name ].type, this.icons[ name ].href );
  }

  public reset(): void {
    for ( const name of Object.keys( this.icons ) ) {
      const icon = this.icons[ name ];
      if ( icon.isDefault ) {
          this.setNode( icon.type, icon.href );
          return;
      }
    }

    this.removeNode();
  }

  private addNode( type: string, href: string ): void {
    const linkElement = document.createElement( 'link' );
    linkElement.setAttribute( 'id', this.elementId );
    linkElement.setAttribute( 'rel', 'icon' );
    linkElement.setAttribute( 'type', type );
    linkElement.setAttribute( 'href', href );
    document.head.appendChild( linkElement );
  }

  private cacheBustHref( href: string ): string {
    const augmentedHref = ( href.indexOf( '?' ) === -1 )
      ? `${ href }?faviconCacheBust=${ Date.now() }`
      : `${ href }&faviconCacheBust=${ Date.now() }`
    ;
    return( augmentedHref );
  }

  private removeExternalLinkElements(): void {

    const linkElements = document.querySelectorAll( 'link[ rel ~= "icon" i]' );
    for ( const linkElement of Array.from( linkElements ) ) {
      linkElement.parentNode.removeChild( linkElement );
    }
  }

  private removeNode(): void {

    const linkElement = document.head.querySelector( '#' + this.elementId );
    if ( linkElement ) {
      document.head.removeChild( linkElement );
    }
  }

  private setNode( type: string, href: string ): void {

    const augmentedHref = this.useCacheBusting ? this.cacheBustHref(href) : href;

    this.removeNode();
    this.addNode(type, augmentedHref);
  }

}
