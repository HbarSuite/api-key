# @hsuite/api-key

A comprehensive NestJS module for API key-based authentication, providing a complete solution for protecting routes and validating API keys in your application.

## Features

- 🔐 API key validation and authentication
- 🛡️ Route protection through guards
- 🔄 Passport.js integration
- 🌐 Global or feature-module registration
- 📦 Built-in user integration
- 🔑 Bearer token support in Authorization header

## Installation

```bash
npm install @hsuite/api-key
```

### Peer Dependencies

This module requires the following peer dependencies:

```json
{
  "@nestjs/common": "^10.4.2",
  "@nestjs/core": "^10.4.2"
}
```

## Quick Start

1. Import the module in your `app.module.ts`:

```typescript
import { ApiKeyModule } from '@hsuite/api-key';

@Module({
  imports: [
    ApiKeyModule.forRoot() // Register globally
  ]
})
export class AppModule {}
```

2. Protect your routes using the guard:

```typescript
import { ApiKeyAuthGuard } from '@hsuite/api-key';

@UseGuards(ApiKeyAuthGuard)
@Controller('api')
export class ApiController {
  @Get('protected')
  getProtectedResource() {
    return 'This route is protected by API key authentication';
  }
}
```

## API Reference

### ApiKeyModule

The main module that provides API key authentication functionality.

#### Methods

- `forRoot()`: Registers the module globally in your application.

### ApiKeyService

Service responsible for API key operations and validation.

#### Methods

- `validateApiKey(apiKey: string, user: UserDocument): Promise<User>`
  - Validates an API key against a user's stored credentials
  - Returns the user object if valid, null otherwise

### ApiKeyAuthGuard

Guard that protects routes requiring API key authentication.

### ApiKeyStrategy

Passport strategy implementation for API key authentication.

## Usage Examples

### Protecting Routes

```typescript
// Protect a single route
@UseGuards(ApiKeyAuthGuard)
@Get('resource')
getResource() {
  return 'Protected resource';
}

// Protect an entire controller
@UseGuards(ApiKeyAuthGuard)
@Controller('api')
export class ApiController {
  // All routes require API key authentication
}
```

### Making Authenticated Requests

Clients should include the API key in the Authorization header using the Bearer scheme:

```http
Authorization: Bearer your-api-key-here
```

### Validating API Keys

```typescript
@Injectable()
export class YourService {
  constructor(private apiKeyService: ApiKeyService) {}

  async validateKey(apiKey: string, user: UserDocument) {
    const validUser = await this.apiKeyService.validateApiKey(apiKey, user);
    if (validUser) {
      // API key is valid
    }
  }
}
```

## Architecture

The module consists of several key components:

1. **ApiKeyModule**: The main module that ties everything together
2. **ApiKeyService**: Handles API key validation and management
3. **ApiKeyAuthGuard**: Protects routes requiring authentication
4. **ApiKeyStrategy**: Implements the Passport.js authentication strategy

## Documentation

Detailed documentation can be generated using Compodoc:

```bash
npm run compodoc
```

To check documentation coverage:

```bash
npm run compodoc:coverage
```

## Version

Current version: 2.0.0

## License

This package is part of the HSuite Enterprise solution.

<p align="center">
  Built with ❤️ by the HbarSuite Team<br>
  Copyright © 2024 HbarSuite. All rights reserved.
</p>