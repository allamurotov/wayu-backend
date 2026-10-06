# Wayu Backend Architecture & System Specifications

## 1. Modular Architecture & Dependency Injection
The service is structured as domain-driven NestJS modules with isolated dependency boundaries.

## 2. Request Validation & DTO Transformation
Incoming HTTP requests pass through global validation pipes using class-validator and class-transformer.

## 3. Authentication & JWT Token Lifecycle
Authentication relies on Passport JWT strategies with cryptographically signed tokens and rotating refresh tokens.

## 4. Role-Based Access Control (RBAC) Guards
Endpoint access is secured using custom `@Roles()` decorators evaluated by execution context guards.

## 5. Global Exception Filter & Error Payload
All unhandled exceptions are caught by global filters to ensure uniform JSON error schemas across APIs.

## 6. Response Serialization & Execution Interceptors
Interceptors transform outgoing responses into standardized envelopes and log request durations.

## 7. Database Connection Pooling & Migrations
Database layers enforce connection pooling limits, query performance indices, and explicit migration files.

## 8. Redis Distributed Caching Layer
High-throughput read queries leverage in-memory Redis caching with automated TTL invalidation hooks.

## 9. Throttling & DDoS Protection
Rate limiters dynamically monitor IP request frequencies to shield endpoints from abusive traffic.

## 10. Swagger OpenAPI Documentation
Controllers include comprehensive Swagger decorators documenting parameter contracts and schemas.

## 11. BullMQ Background Job Processing
Heavy asynchronous jobs like email deliveries and media exports are dispatched to isolated workers.

## 12. File Storage Pipeline & Multipart Validation
Uploaded binaries are checked against MIME signatures and file size limits prior to persistent storage.
