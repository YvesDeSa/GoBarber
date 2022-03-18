import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";

const redisClient = new Redis({ enableOfflineQueue: false });

const rateLimiterRedis = new RateLimiterRedis({
  storeClient: redisClient,
  points: 5,
  duration: 1,

  execEvenly: false,
  blockDuration: 0,
  keyPrefix: 'ratelimit',
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    await rateLimiterRedis.consume(request.ip);

    return next();

  } catch (err) {
    throw new AppError('Too many request', 429)
  }
}
