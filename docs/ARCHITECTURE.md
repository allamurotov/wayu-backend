# Wayu Backend Architecture & System Specifications

## 1. Modular Architecture & Dependency Injection
The service is structured as domain-driven NestJS modules with isolated dependency boundaries.

## 2. Request Validation & DTO Transformation
Incoming HTTP requests pass through global validation pipes using class-validator and class-transformer.

## 3. Authentication & JWT Token Lifecycle
Authentication relies on Passport JWT strategies with cryptographically signed tokens and rotating refresh tokens.
