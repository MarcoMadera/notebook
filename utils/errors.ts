import { Context } from "react";

interface ErrorMetadata {
  code?: string;
  timestamp?: string;
  details?: Record<string, unknown>;
}

abstract class BaseError extends Error {
  readonly timestamp: string;
  readonly code?: string;
  readonly details?: Record<string, unknown>;

  constructor(message: string, metadata: ErrorMetadata = {}) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = metadata.timestamp ?? new Date().toISOString();
    this.code = metadata.code;
    this.details = metadata.details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static isThisError(error: unknown): error is BaseError {
    return error instanceof this;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      timestamp: this.timestamp,
      details: this.details,
      stack: this.stack,
    };
  }
}

export class ContextError<T> extends BaseError {
  constructor(context: Context<T | undefined>) {
    const contextName = context.displayName ?? "Context";
    super(`use${contextName} must be used within a ${contextName}Provider`);
    this.name = "ContextError";
  }
}
