import { DynamicModule, Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyAuthGuard } from './guards/api-key.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModelModule } from '@hsuite/users';
import { ApiKeyStrategy } from './strategies/api-key.strategy';

/**
 * Module for handling API key authentication.
 * 
 * @description
 * This module provides a complete solution for API key-based authentication in NestJS applications.
 * It includes all necessary components for implementing API key authentication:
 * - ApiKeyService: Handles API key validation and management
 * - ApiKeyAuthGuard: Protects routes requiring API key authentication
 * - ApiKeyStrategy: Implements the authentication strategy using Passport.js
 * 
 * The module can be used either globally through forRoot() or imported into specific feature modules.
 * It automatically integrates with the UserModelModule for user-related operations.
 * 
 * @example
 * ```typescript
 * // Global registration in AppModule
 * @Module({
 *   imports: [
 *     ApiKeyModule.forRoot()
 *   ]
 * })
 * export class AppModule {}
 * 
 * // Feature module registration
 * @Module({
 *   imports: [
 *     ApiKeyModule
 *   ]
 * })
 * export class FeatureModule {}
 * ```
 * 
 * @module ApiKeyModule
 */
@Module({
  imports: [
    UserModelModule // Import UserModelModule for user-related functionality
  ],
  providers: [
    ApiKeyService, // Service handling API key operations
    ApiKeyAuthGuard, // Guard for protecting routes with API key authentication
    ApiKeyStrategy, // Strategy implementing API key validation logic
    {
      provide: APP_GUARD,
      useClass: ApiKeyAuthGuard // Register ApiKeyAuthGuard as a global guard
    }
  ],
  exports: [
    ApiKeyService, // Export service for use in other modules
    ApiKeyAuthGuard, // Export guard for manual route protection
    ApiKeyStrategy // Export strategy for custom implementations
  ]
})
export class ApiKeyModule {
  /**
   * Creates a dynamic module instance of ApiKeyModule.
   * 
   * This static method configures the module as global, making its providers
   * available throughout the application without needing to import the module
   * in each feature module.
   * 
   * @returns {DynamicModule} A dynamic module instance of ApiKeyModule with global scope.
   * 
   * @example
   * ```typescript
   * // In your AppModule:
   * imports: [
   *   ApiKeyModule.forRoot()
   * ]
   * ```
   */
  static forRoot(): DynamicModule {
    return {
      module: ApiKeyModule,
      global: true, // Make module globally available
    };
  }
}
