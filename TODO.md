# College Discovery Platform Completion TODO

## Plan Breakdown (Approved)
Selected: Listing (enhance), Detail (render/save), Compare, Predictor + Basic Auth.

## Steps (Step-by-step execution)

### 1. DB Setup & Full Seed (Critical - no data currently)
- [x] Complete seed.ts with 20+ colleges (courses/placements/reviews JSON).
- [x] Run Windows CMD: `npx prisma generate & npx prisma db push & npx tsx prisma/seed.ts`.
- [x] Verify: Check college count via API or Prisma Studio. (22 colleges seeded ✅)

### 2. Basic Auth Implementation
- [x] Create `/app/api/auth/login/route.ts` (email/password, bcrypt, set httpOnly cookie).
- [x] Create `/app/api/auth/register/route.ts`.
- [x] Create `/app/api/auth/me/route.ts` (get user).
- [x] Create `src/lib/auth.ts` (middleware/getSession helpers).
- [x] Update `src/app/login/page.tsx` (form submit to API, redirect).
- [x] Add logout.

### 3. Enhance College Detail Page
- [x] Update `src/app/colleges/[id]/page.tsx`: Parse/render courses (list), placements (stats), reviews (cards).
- [x] Add save/unsave button (auth-gated, POST to new API `/api/users/saves`).

### 4. Implement Compare Colleges
- [x] Update `src/components/CollegeCard.tsx`: Add select button (localStorage).
- [x] Update `src/app/compare/page.tsx`: Fetch selected, render table.
- [x] Create `src/components/CompareTable.tsx`.

### 5. Add Rank Predictor Tool
- [x] Create `src/app/predictor/page.tsx` (form: exam/rank).
- [x] Create `/app/api/predictor/route.ts` (rule-based logic).

### 6. UI Polish & Navigation
- [ ] Update `src/app/layout.tsx`: Add nav bar.
- [ ] Add loading/error states everywhere.

### 7. Testing
- [ ] Test end-to-end: Seed -> list/filter -> detail/save -> compare -> predictor -> auth.
- [ ] Handle edge cases (no colleges, invalid login).

### 8. Deployment
- [ ] Push to GitHub.
- [ ] Deploy to Vercel (vercel.com, connect repo).
- [ ] Migrate to PostgreSQL if needed (update schema datasource).

**Current Progress: Starting Step 1**

**Next Action: Complete seed.ts and run DB commands.**
