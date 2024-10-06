import { CommonModule } from "@angular/common";
import { HttpInterceptorFn } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BaseChartDirective } from "ng2-charts";
import { loadingInterceptor } from "src/app/interceptors/loading.interceptor";

export const sharedImports = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective,
];

export const interceptorProviders: Array<HttpInterceptorFn> = [
    loadingInterceptor,
];