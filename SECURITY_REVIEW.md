# Website security review

Reviewed 24 November 2026. This is a source-code and application review, not a penetration-test certification or a review of the private Supabase and Vercel account settings.

## Changes made

* Removed the public Admin link. Existing Supabase accounts and the sign-in address are retained as requested. Hiding a link does not make an address secret or replace authentication.
* Upgraded Next.js from 16.3.4 to the patched 16.4.6 release and updated its matching lint configuration. Updated vulnerable development dependencies too. The full dependency audit reported zero known vulnerabilities after the updates.
* Public health checks now return only a minimal availability response. Configuration and database diagnostics require an authenticated session and are never publicly cached.
* Content-editing requests require a matching request origin, authentication, a permitted section key, and valid JSON. Draft saves have a size limit. Database error details are no longer returned to the visitor.
* Public content responses expose only the documented section keys. Preview responses are private and not cached; unauthenticated visitors receive published content.
* Added clickjacking protection, MIME-sniffing protection, a referrer policy, a permissions policy, HSTS, and a baseline Content Security Policy. Disabled the framework identification header.
* Admin pages and API responses are marked against indexing. Public sitemaps list only public pages.
* Server form handlers validate offered booking slots, dates, and published upcoming events. Honeypot handling is retained and submission throttling is added.
* Marked the privileged Supabase and form-security modules as server-only. User-supplied email content remains HTML-escaped.

## Items requiring private account access or a separate decision

1. **Account permissions.** The existing content API accepts any valid Supabase session. This was intentionally preserved. Confirm that accounts are owner-managed and that public signup is disabled unless a separate, restricted member role is implemented. Use MFA for administrative accounts where available.
2. **Database policies.** The checked-in schema grants broad privileges to authenticated users and permits anonymous form-table inserts. The deployed policies have not been inspected from inside Supabase. Direct database requests could bypass website form validation and throttling. Review the live policies before changing them; ideally use restricted administrative roles and server-only writes for submissions.
3. **Abuse prevention.** Submission limits are best-effort and local to each server instance. They are not a distributed rate limit. Configure durable throttling or Vercel firewall rules if traffic or abuse warrants it.
4. **Content Security Policy.** Inline scripts and styles remain permitted for compatibility with the existing framework and animations. A nonce-based policy is a possible further hardening step; the current policy should not be described as complete XSS protection.
5. **Secrets and recovery.** Hosting secrets, Supabase signup settings, MFA, backups, log retention, and recovery access were not changed or independently verified. Never commit real keys to the repository.

## Validation

The change includes tests for translation coverage, preserved URLs and technical hyphens, cross-origin rejection, booking-date validation, and submission-limit expiry. Browser checks cover all public pages in four languages, language persistence, language-specific server HTML and metadata, public-link removal, mobile layout, and unauthenticated API responses.
