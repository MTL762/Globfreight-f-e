# Postman Form Generator - OpenAPI Support

## Fixed Issue

The Postman Form Generator page was throwing the error "No requests found in the Postman collection" when provided with an OpenAPI 3.0 specification instead of a Postman collection.

## Root Cause

The original parser only supported **Postman Collection Format** (which uses nested `item` arrays), but didn't support **OpenAPI 3.0 specifications** (which use a `paths` object with HTTP methods).

These are two completely different API documentation formats:

- **Postman Collection**: Hierarchical structure with nested items
- **OpenAPI Spec**: Flat structure with paths and methods

## Solution

### 1. Created `openapi-parser.ts`

A new utility module that:
- Detects if a JSON is an OpenAPI specification
- Parses OpenAPI specs to extract endpoints, methods, parameters, and request bodies
- Converts OpenAPI schema types to form input types
- Supports both query parameters and request body inputs
- Matches endpoints to existing endpoints registry

**Key Features:**
- Auto-detection of OpenAPI vs Postman format
- Type inference from OpenAPI schemas
- Support for required fields
- Enum support for select inputs
- Multipart form data support

### 2. Updated `postman-form-generator/page.tsx`

Modified the page component to:
- Import the new OpenAPI parser
- Auto-detect format using `isOpenAPISpec()` function
- Use appropriate parser based on format
- Updated UI labels and placeholders to reflect support for both formats
- Improved error messages

## Usage

You can now paste either format:

```json
// Postman Collection
{
  "info": { "name": "My API" },
  "item": [
    {
      "name": "Get Users",
      "request": {
        "method": "GET",
        "url": "https://api.example.com/users"
      }
    }
  ]
}
```

Or:

```json
// OpenAPI 3.0 Specification
{
  "openapi": "3.0.0",
  "paths": {
    "/api/users": {
      "get": {
        "operationId": "getUsers",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "schema": { "type": "number" }
          }
        ],
        "responses": { "200": { "description": "Success" } }
      }
    }
  }
}
```

## Supported Input Types

Automatically converted from OpenAPI schema types:

| OpenAPI Type | Form Input Type |
| ------------ | --------------- |
| `string`     | `text`          |
| `number`     | `number`        |
| `integer`    | `number`        |
| `boolean`    | `checkbox`      |
| `array`      | `multiSelect`   |
| `object`     | `textarea`      |
| with `enum`  | `select`        |

## Test File

A test file is included at `utils/openapi-parser.test.ts` with examples of:
- Format detection
- Parsing various endpoint types
- Input extraction from parameters and request bodies

## Files Modified

- ✅ [openapi-parser.ts](openapi-parser.ts) - New utility module
- ✅ [app/[locale]/(dev)/postman-form-generator/page.tsx](../app/%5Blocale%5D/%28dev%29/postman-form-generator/page.tsx) - Updated to support both formats

## Benefits

1. **Wider Format Support**: Now supports both Postman and OpenAPI formats
2. **Better Developer Experience**: Single tool for multiple API documentation formats
3. **Type Safety**: Full TypeScript support
4. **Auto-Detection**: Automatically detects format, no need for manual selection
5. **Extensible**: Easy to add support for more formats in the future
