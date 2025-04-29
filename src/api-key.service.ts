import { Injectable } from '@nestjs/common';
import { User, UserDocument, UserModelService } from '@hsuite/users';
import { LoggerHelper } from '@hsuite/helpers';

/**
 * Service responsible for API key operations and validation.
 * 
 * @description
 * This service provides comprehensive functionality to validate and manage API keys for users.
 * It integrates with the UserModelService to perform database operations and verify API key authenticity.
 * The service is designed to work with the API key authentication strategy and guard.
 * 
 * @example
 * ```typescript
 * // Inject the service
 * constructor(private apiKeyService: ApiKeyService) {}
 * 
 * // Validate an API key
 * async validateKey(apiKey: string, user: UserDocument) {
 *   const validUser = await this.apiKeyService.validateApiKey(apiKey, user);
 *   if (validUser) {
 *     // API key is valid
 *   }
 * }
 * ```
 */
@Injectable()
export class ApiKeyService {
    /**
     * Logger instance for API key-related operations
     * @type {LoggerHelper}
     */
    protected logger: LoggerHelper = new LoggerHelper(ApiKeyService.name);

    /**
     * Creates an instance of ApiKeyService.
     * 
     * @param userModelService - Service for user-related database operations
     */
    constructor(
        private userModelService: UserModelService
    ) {}

    /**
     * Validates an API key against a user's stored credentials.
     * 
     * @description
     * This method performs a secure validation of the provided API key by:
     * 1. Checking if the key exists in the user's tags
     * 2. Verifying the key matches the stored value
     * 3. Returning the associated user if validation succeeds
     * 
     * @param apiKey - The API key string to validate
     * @param user - The user document to validate against
     * @returns Promise resolving to the User if valid, null if invalid
     * @throws {Error} If database operation fails
     * 
     * @example
     * ```typescript
     * try {
     *   const user = await apiKeyService.validateApiKey('abc123', userDoc);
     *   if (user) {
     *     // API key is valid, proceed with authenticated operation
     *   } else {
     *     // Invalid API key
     *   }
     * } catch (error) {
     *   // Handle database error
     * }
     * ```
     */
    validateApiKey(
        apiKey: string,
        user: UserDocument
    ): Promise<User> {
        // Return a new promise to handle async validation
        return new Promise(async (resolve, reject) => {
            try {
                // Query the database for a user with matching ID and API key
                let userDocument: UserDocument = await this.userModelService.findOne({
                    _id: user._id,
                    'tags.key': 'api-key',
                    'tags.value': apiKey
                });

                // Convert document to plain object and resolve
                resolve(userDocument?.toJSON() as User);
            } catch (error) {
                // Reject promise if any error occurs
                reject(error);
            }
        });
    }
}
