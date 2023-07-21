"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let AuthGuard = exports.AuthGuard = class AuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const url = request.url;
        const queryParams = [];
        let sign;
        const secretKey = 'wvl68m4dR1UpLrVRli';
        const urlParams = url.slice(url.indexOf('?') + 1);
        for (const param of urlParams.split('&')) {
            const [key, value] = param.split('=');
            if (key === 'sign') {
                sign = value;
                continue;
            }
            else if (key.startsWith('vk_'))
                queryParams.push({ key, value });
        }
        if (!sign || queryParams.length === 0)
            return false;
        const rebuildQueryString = queryParams
            .sort((a, b) => a.key.localeCompare(b.key))
            .reduce((acc, { key, value }, index) => {
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
};
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
//# sourceMappingURL=app.vkAuthGuard.js.map