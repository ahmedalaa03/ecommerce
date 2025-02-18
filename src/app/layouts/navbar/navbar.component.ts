import { Component, computed, ElementRef, inject, input, InputSignal, OnInit, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTraslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) { }
  @ViewChild('dropdownNavbar') dropdown!: ElementRef;
  readonly authService = inject(AuthService);
  private readonly myTranslateService = inject(MyTranslateService);
  private readonly translateService = inject(TranslateService);
  private readonly cartService = inject(CartService);
  isLogin: InputSignal<boolean> = input<boolean>(true);
  isLoading: WritableSignal<boolean> = signal(false);
  countCart: Signal<number> = computed(() => this.cartService.cartNumber());
  ngOnInit(): void { this.flowbiteService.loadFlowbite(flowbite => { }); if (this.isLogin()) { this.isLoading.set(true); this.cartService.getLLoggedUserCart().subscribe({ next: (res) => { this.cartService.cartNumber.set(res.numOfCartItems); this.isLoading.set(false) } }) } }
  change(lang: string): void {
    this.myTranslateService.changeLangTranslate(lang);
    if (this.dropdown) {
      this.dropdown.nativeElement.classList.add('hidden');
    }
  }
  currentLang(lang: string): boolean {
    return this.translateService.currentLang === lang
  }
}