import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { CurrentsService } from "../services/currents.service";
import { finalize } from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const currentsService = inject(CurrentsService);
    currentsService.setIsLoading(true);
    return next(req).pipe(
        finalize(() => currentsService.setIsLoading(false)),
    )
}