import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { Injectable } from "@nestjs/common";
import { ApiKeyService } from "../api-key.service";
import { UserDocument } from "@hsuite/users";
import { Request } from 'express';

/**
 * Passport strategy implementation for API key authentication.
 * 
 * @description
 * This strategy extends Passport's HeaderAPIKeyStrategy to provide API key authentication
 * for NestJS applications. It validates API keys passed in the Authorization header
 * with the 'Bearer' prefix.
 * 
 * Key features:
 * - Extracts API key from Authorization header
 * - Validates keys using ApiKeyService
 * - Supports session-based authentication
 * - Integrates with NestJS's built-in authentication system
 * 
 * @example
 * ```typescript
 * // The strategy expects headers in this format:
 * Authorization: Bearer your-api-key-here
 * 
 * // Usage in a controller
 * @UseGuards(AuthGuard('api-key'))
 * @Controller('api')
 * export class ApiController {
 *   // Routes are protected by API key authentication
 * }
 * ```
 */
@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
    /**
     * Creates an instance of ApiKeyStrategy.
     * 
     * @description
     * Configures the strategy with:
     * - Authorization header extraction
     * - Bearer prefix support
     * - Session support enabled
     * - Custom validation logic
     * 
     * @param apiKeyService - Service for validating API keys
     */
    constructor(
        private apiKeyService: ApiKeyService
    ) {
        super(
            { header: 'Authorization', prefix: 'Bearer ' },
            true, // Enable passport session support
            /**
             * Validates the provided API key and returns the associated user.
             * 
             * @description
             * This callback function:
             * 1. Extracts the API key from the request
             * 2. Validates it against the user's stored credentials
             * 3. Returns the user object if validation succeeds
             * 
             * @param apiKey - The extracted API key from the request header
             * @param done - Passport callback for handling authentication result
             * @param request - Express request object containing user information
             */
            async(apiKey: string, done: (error: any, user?: any) => void, request: Request) => {
                try {
                    // Validate the API key and get associated user
                    const user = await this.apiKeyService.validateApiKey(apiKey, request.user as UserDocument);
                    
                    if (!user) {
                        return done(null, false); // Authentication failed
                    }
                    
                    return done(null, user); // Authentication successful
                } catch (error) {
                    return done(error); // Error during validation
                }
            }
        );
    }
}