import '@vaadin/vaadin-app-layout';
import { AppLayoutElement } from '@vaadin/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-context-menu';
import '@vaadin/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import { customElement, html } from 'lit-element';
import { router } from '../index';
import { appStore } from '../stores/app-store';
import { Layout } from './view';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

@customElement('main-layout')
export class MainLayout extends Layout {
  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <header class="bg-base border-b border-contrast-10 box-border flex h-xl items-center w-full" slot="navbar">
          <vaadin-drawer-toggle aria-label="Menu toggle" class="text-secondary" theme="contrast"></vaadin-drawer-toggle>
          <h1 class="m-0 text-l">${appStore.currentViewTitle}</h1>
        </header>
        <section class="flex flex-col items-stretch max-h-full min-h-full" slot="drawer">
          <h2 class="flex items-center h-xl m-0 px-m text-m">${appStore.applicationName}</h2>
          <nav aria-labelledby="views-title" class="border-b border-contrast-10 flex-grow overflow-auto">
            <h3 class="flex items-center h-m mx-m my-0 text-s text-tertiary" id="views-title">Views</h3>
            ${this.getMenuRoutes().map(
              (viewRoute) => html`
                <a
                  ?highlight=${viewRoute.path == appStore.location}
                  class="flex mx-s p-s relative text-secondary"
                  href=${router.urlForPath(viewRoute.path)}
                >
                  <span class="${viewRoute.icon} me-s text-l"></span>
                  <span class="font-medium text-s">${viewRoute.title}</span>
                </a>
              `
            )}
          </nav>
          <footer class="flex items-center my-s px-m py-xs"></footer>
        </section>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('block', 'h-full');
    this.reaction(
      () => appStore.location,
      () => {
        AppLayoutElement.dispatchCloseOverlayDrawerEvent();
      }
    );
  }

  private getMenuRoutes(): RouteInfo[] {
    return [
      {
        path: 'hello',
        title: 'Hello World',
        icon: 'la la-globe',
      },

      {
        path: 'about',
        title: 'About',
        icon: 'la la-file',
      },

      {
        path: 'card-list',
        title: 'Card List',
        icon: 'la la-list',
      },

      {
        path: 'list',
        title: 'List',
        icon: 'la la-th',
      },

      {
        path: 'master-detail',
        title: 'Master-Detail',
        icon: 'la la-columns',
      },

      {
        path: 'collaborative-master-detail',
        title: 'Collaborative Master-Detail',
        icon: 'la la-columns',
      },

      {
        path: 'person-form',
        title: 'Person Form',
        icon: 'la la-user',
      },

      {
        path: 'address-form',
        title: 'Address Form',
        icon: 'la la-map-marker',
      },

      {
        path: 'credit-card-form',
        title: 'Credit Card Form',
        icon: '',
      },

      {
        path: 'map',
        title: 'Map',
        icon: 'la la-map',
      },

      {
        path: 'chat',
        title: 'Chat',
        icon: 'la la-comments',
      },

      {
        path: 'editor',
        title: 'Editor',
        icon: 'la la-edit',
      },

      {
        path: 'image-list',
        title: 'Image List',
        icon: 'la la-th-list',
      },

      {
        path: 'checkout-form',
        title: 'Checkout Form',
        icon: '',
      },
    ];
  }
}
