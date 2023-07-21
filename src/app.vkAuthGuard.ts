/* eslint-disable prettier/prettier */
import { Injectable,  CanActivate, ExecutionContext} from "@nestjs/common";
import * as crypto from 'crypto';


@Injectable()
export class authGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();
        
        const url = 'https://example.com/?vk_user_id=494075&vk_app_id=6736218&vk_is_app_user=1&vk_are_notifications_enabled=1&vk_language=ru&vk_access_token_settings=&vk_platform=android&sign=htQFduJpLxz7ribXRZpDFUH-XEUhC9rBPTJkjUFEkRA';
        const queryParams : any[] = [];
        let sign : string;
        const secretKey = 'wvl68m4dR1UpLrVRli';

        const urlParams = url.slice(url.indexOf('?') + 1);

        for(const param of urlParams.split('&')) {
            const [key, value] = param.split('=');
            if(key === 'sign'){
                sign = value;
                continue;
            }
            else if(key.startsWith('vk_'))
                queryParams.push({key, value});
        }

        if(!sign || queryParams.length === 0)
            return false;

        const rebuildQueryString = queryParams
        .sort((a, b) => a.key.localeCompare(b.key))
        .reduce<string>((acc, {key, value}, index) => {
            return acc + (index === 0 ? '' : '&') + `${key}=${encodeURIComponent(value)}`;
        }, '');

        const paramHash = crypto
        .createHmac('sha256', secretKey)
        .update(rebuildQueryString)
        .digest()
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=$/, '');

        

        return paramHash === sign;

    }
}