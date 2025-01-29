/**
 * API Key Authentication Module
 * @module api-key
 * @description
 * Provides comprehensive API key authentication functionality for NestJS applications.
 * Includes guards, strategies, and services for implementing and managing API key-based
 * authentication. This module can be used globally or imported into specific feature modules.
 * 
 * @packageDocumentation
 */

// Export the main module that handles API key functionality
export * from './api-key.module';

// Export the service that manages API key operations
export * from './api-key.service';

// Export the guard that protects routes using API key authentication
export * from './guards/api-key.guard';

// Export the strategy that implements the API key validation logic
export * from './strategies/api-key.strategy';
