import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTraslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService) { }
  @ViewChild('dropdownNavbar') dropdown!: ElementRef;
 readonly authService = inject(AuthService);
 private readonly myTranslateService = inject(MyTranslateService);
 private readonly translateService = inject(TranslateService);
 isLogin = input<boolean>(true);
  ngOnInit(): void { this.flowbiteService.loadFlowbite(flowbite => { }); }
  change(lang: string): void {
    this.myTranslateService.changeLangTranslate(lang);
    if (this.dropdown) {
      this.dropdown.nativeElement.classList.add('hidden');
    }
  }
  currentLang(lang:string):boolean{
    return this.translateService.currentLang === lang
  }
}