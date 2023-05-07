import { Injectable, HostListener, AfterViewInit, OnInit } from '@angular/core';
import $ from 'jquery';
import 'magnific-popup';

@Injectable({
  providedIn: 'root'
})
export class HelperService implements AfterViewInit, OnInit {

  public userNavigation = [
    {
      id: 1,
      linkText: "Home",
      link: "/",
      outsideLink: false,
      open: true,
      child: false,
      submenu: [
        {
          link:"",
          linkText:"",
          child: false,
        }
      ]
    },

  ];
  public userTwoNavigation = [
    {
      id: 1,
      linkText: "Home",
      link: "/",
      open: true,
      outsideLink: false,
      child: false,
      submenu: [
        {
          link:"",
          linkText:"",
          child: false,
        }
      ]
    } ,
    {
      id: 4,
      linkText: "Profile",
      link: "/profile",
      outsideLink: false,
      open: true,
      child: true,
      submenu: [
        {
          id: 4.1,
          link: "/profile",
          linkText: "My Profile",
          outsideLink: false,
          isLogout: false,
          child: false

        },
        {
          id: 4.2,
          link: "/",
          linkText: "Sign Out",
          outsideLink: false,
          isLogout: true,
          child: false,

        }
      ]
    },
  ];
  public locationNavigation = [
    {
      id: 1,
      linkText: "Home",
      link: "/",
      open: true,
      child: false,
      submenu: [
        {
          link:"",
          linkText:"",
          child: false,
        }
      ]
    } ,
    {
      id: 4,
      linkText: "Profile",
      link: "/profile",
      outsideLink: false,
      open: true,
      child: true,
      submenu: [
        {
          id: 5.1,
          link: "/profile",
          linkText: "My Profile",
          outsideLink: false,
          isLogout: false,

          child: false
        },
        {
          id: 5.5,
          link: "/",
          linkText: "Sign out",
          outsideLink: false,
          isLogout: true,

          child: false,
        },
      ]
    }
  ];
  windowScrolled : boolean | undefined;
  constructor() {}

  // Sticky Nav
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.windowScrolled = window.scrollY > 100;
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
  // navigation
  navMethod: boolean = false;
  toggleNav() {
    this.navMethod = !this.navMethod;
  }
  //Mobile
  open: boolean = false;
  trigger(item: { open: boolean; }) {
    item.open = !item.open;
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    ($('.popup-youtube') as any).magnificPopup({
      type: 'iframe'
    });
    ($('.popup') as any).magnificPopup({
      type: 'image',
      gallery: {
        enabled: true,
      },
      mainClass: 'mfp-fade',
    });
  }
}
