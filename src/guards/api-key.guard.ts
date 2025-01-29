import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard for API key authentication in NestJS applications.
 * 
 * @description
 * The ApiKeyAuthGuard extends Passport's AuthGuard to provide API key-based
 * route protection. It works in conjunction with the ApiKeyStrategy to validate
 * API keys from request headers.
 * 
 * When applied to a route or controller, this guard:
 * 1. Extracts the API key from the Authorization header
 * 2. Validates the key using the configured strategy
 * 3. Attaches the authenticated user to the request object
 * 
 * @example
 * ```typescript
 * // Protect a single route
 * @UseGuards(ApiKeyAuthGuard)
 * @Get('protected')
 * async protectedRoute() {
 *   return 'This route requires a valid API key';
 * }
 * 
 * // Protect an entire controller
 * @UseGuards(ApiKeyAuthGuard)
 * @Controller('api')
 * export class ApiController {
 *   // All routes in this controller require API key authentication
 * }
 * ```
 * 
 * @publicApi
 */
@Injectable()
export class ApiKeyAuthGuard extends AuthGuard('api-key') {
    // Inherits authentication logic from Passport's AuthGuard
}