import { AuthGuard } from './auth-page/auth.guard';
import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AuthPageComponent } from "./auth-page/auth-page.component";
import { MainPageComponent } from "./main-page/main-page.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/calendar', pathMatch: 'full' },
    { path: 'calendar', component: MainPageComponent, canActivate: [AuthGuard] },
    { path: 'auth', component: AuthPageComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}