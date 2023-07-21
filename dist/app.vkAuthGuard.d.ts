import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class authGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
