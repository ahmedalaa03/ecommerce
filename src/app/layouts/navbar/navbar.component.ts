import { Component, inject, input } from '@angular/core';
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
 readonly authService = inject(AuthService);
 private readonly myTranslateService = inject(MyTranslateService);
 private readonly translateService = inject(TranslateService);
  ngOnInit(): void { this.flowbiteService.loadFlowbite(flowbite => { }); }
  isLogin = input<boolean>(true);
  change(lang: string): void {
    this.myTranslateService.changeLangTranslate(lang);
  }
  currentLang(lang:string):boolean{
    return this.translateService.currentLang === lang
  }
}
