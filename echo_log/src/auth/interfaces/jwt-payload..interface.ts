export interface JwtPayload {
  userId: string;
  username: string;
  sub: number; // 사용자 ID (subject)
  iat?: number; // 토큰 발급 시간 (issued at)
  exp?: number; // 토큰 만료 시간 (expiration)
}
