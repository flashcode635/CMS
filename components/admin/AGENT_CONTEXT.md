# Directory: components/admin

`LoginForm.tsx` is the admin-only login presentation used by
`app/admin/login/page.tsx`. It intentionally posts to the separate
`/api/admin/login` endpoint, which is reserved for the future admin backend
and is not shared with the public `/api/auth/*` flow.
