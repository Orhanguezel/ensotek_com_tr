import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|apple-icon|icon|manifest|robots|sitemap|opengraph-image|twitter-image|llms\\.txt|.*\\..*).*)'],
};
