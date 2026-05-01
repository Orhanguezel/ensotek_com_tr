// =============================================================
// FILE: src/modules/review/repository.ts
// =============================================================
import { db } from '../../db/client';
import { reviews, reviewTranslations } from './schema';
import { and, eq, like, asc, desc, sql } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import type { ReviewListQuery, ReviewCreateInput, ReviewUpdateInput } from './validation';

/* ── Row mapper ── */
function toView(r: typeof reviews.$inferSelect, t: { comment: string | null; title: string | null; admin_reply: string | null } | null) {
  return {
    id: r.id,
    target_type: r.target_type,
    target_id: r.target_id,
    name: r.name,
    email: r.email,
    rating: Number(r.rating),
    role: r.role ?? null,
    company: r.company ?? null,
    avatar_url: r.avatar_url ?? null,
    logo_url: r.logo_url ?? null,
    profile_href: r.profile_href ?? null,
    is_active: Number(r.is_active) === 1,
    is_approved: Number(r.is_approved) === 1,
    display_order: Number(r.display_order),
    likes_count: Number(r.likes_count),
    dislikes_count: Number(r.dislikes_count),
    helpful_count: Number(r.helpful_count),
    submitted_locale: r.submitted_locale,
    created_at: r.created_at,
    updated_at: r.updated_at,
    comment: t?.comment ?? null,
    title: t?.title ?? null,
    admin_reply: t?.admin_reply ?? null,
  };
}

const SORT_MAP = {
  created_at: reviews.created_at,
  rating: reviews.rating,
  display_order: reviews.display_order,
  name: reviews.name,
} as const;

/* ── LIST ── */
export async function repoListReviews(q: ReviewListQuery, locale: string, publicOnly = false) {
  const conds: ReturnType<typeof eq>[] = [];

  if (publicOnly) {
    conds.push(eq(reviews.is_approved, 1 as any));
    conds.push(eq(reviews.is_active, 1 as any));
  } else {
    const approved = q.approved ?? q.is_approved;
    const active = q.active ?? q.is_active;
    if (typeof approved === 'boolean') conds.push(eq(reviews.is_approved, (approved ? 1 : 0) as any));
    if (typeof active === 'boolean') conds.push(eq(reviews.is_active, (active ? 1 : 0) as any));
  }

  if (q.target_type) conds.push(eq(reviews.target_type, q.target_type));
  if (q.target_id) conds.push(eq(reviews.target_id, q.target_id));
  const minRating = q.min_rating ?? q.minRating;
  const maxRating = q.max_rating ?? q.maxRating;
  if (minRating) conds.push(sql`${reviews.rating} >= ${minRating}` as any);
  if (maxRating) conds.push(sql`${reviews.rating} <= ${maxRating}` as any);
  if (q.search) conds.push(like(reviews.name, `%${q.search}%`));

  const orderFn = q.order === 'desc' ? desc : asc;
  const requestedSort = q.orderBy ?? q.sort;
  const sortCol = SORT_MAP[requestedSort as keyof typeof SORT_MAP] ?? reviews.display_order;

  const rows = await db
    .select({
      r: reviews,
      t: {
        comment: reviewTranslations.comment,
        title: reviewTranslations.title,
        admin_reply: reviewTranslations.admin_reply,
      },
    })
    .from(reviews)
    .leftJoin(
      reviewTranslations,
      and(eq(reviewTranslations.review_id, reviews.id), eq(reviewTranslations.locale, locale)),
    )
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(orderFn(sortCol))
    .limit(q.limit)
    .offset(q.offset);

  return rows.map(({ r, t }) => toView(r, t));
}

/* ── GET ── */
export async function repoGetReview(id: string, locale: string) {
  const rows = await db
    .select({
      r: reviews,
      t: {
        comment: reviewTranslations.comment,
        title: reviewTranslations.title,
        admin_reply: reviewTranslations.admin_reply,
      },
    })
    .from(reviews)
    .leftJoin(
      reviewTranslations,
      and(eq(reviewTranslations.review_id, reviews.id), eq(reviewTranslations.locale, locale)),
    )
    .where(eq(reviews.id, id))
    .limit(1);

  if (!rows.length) return null;
  return toView(rows[0].r, rows[0].t);
}

/* ── CREATE ── */
export async function repoCreateReview(body: ReviewCreateInput, locale: string) {
  const id = randomUUID();

  await db.insert(reviews).values({
    id,
    target_type: body.target_type,
    target_id: body.target_id,
    name: body.name,
    email: body.email,
    rating: body.rating,
    role: body.role || null,
    company: body.company || null,
    avatar_url: body.avatar_url || null,
    logo_url: body.logo_url || null,
    profile_href: body.profile_href || null,
    is_active: (body.is_active === false ? 0 : 1) as any,
    is_approved: (body.is_approved === true ? 1 : 0) as any,
    display_order: body.display_order ?? 0,
    submitted_locale: locale,
  });

  await db.insert(reviewTranslations).values({
    id: randomUUID(),
    review_id: id,
    locale,
    title: body.title || null,
    comment: body.comment,
    admin_reply: body.admin_reply || null,
  });

  return repoGetReview(id, locale);
}

/* ── UPDATE ── */
export async function repoUpdateReview(id: string, body: ReviewUpdateInput, locale: string) {
  const sets: Record<string, unknown> = {};
  if (body.name !== undefined) sets.name = body.name;
  if (body.email !== undefined) sets.email = body.email;
  if (body.rating !== undefined) sets.rating = body.rating;
  if (body.target_type !== undefined) sets.target_type = body.target_type;
  if (body.target_id !== undefined) sets.target_id = body.target_id;
  if (body.role !== undefined) sets.role = body.role || null;
  if (body.company !== undefined) sets.company = body.company || null;
  if (body.avatar_url !== undefined) sets.avatar_url = body.avatar_url || null;
  if (body.logo_url !== undefined) sets.logo_url = body.logo_url || null;
  if (body.profile_href !== undefined) sets.profile_href = body.profile_href || null;
  if (body.is_active !== undefined) sets.is_active = (body.is_active ? 1 : 0) as any;
  if (body.is_approved !== undefined) sets.is_approved = (body.is_approved ? 1 : 0) as any;
  if (body.display_order !== undefined) sets.display_order = body.display_order;

  if (Object.keys(sets).length) {
    await db.update(reviews).set(sets).where(eq(reviews.id, id));
  }

  if (body.comment !== undefined || body.title !== undefined || body.admin_reply !== undefined) {
    const existing = await db
      .select({ id: reviewTranslations.id })
      .from(reviewTranslations)
      .where(and(eq(reviewTranslations.review_id, id), eq(reviewTranslations.locale, locale)))
      .limit(1);

    if (existing.length) {
      const translationSets: Record<string, unknown> = {};
      if (body.comment !== undefined) translationSets.comment = body.comment;
      if (body.title !== undefined) translationSets.title = body.title || null;
      if (body.admin_reply !== undefined) translationSets.admin_reply = body.admin_reply || null;
      await db.update(reviewTranslations).set(translationSets).where(eq(reviewTranslations.id, existing[0].id));
    } else {
      await db.insert(reviewTranslations).values({
        id: randomUUID(),
        review_id: id,
        locale,
        title: body.title || null,
        comment: body.comment || '',
        admin_reply: body.admin_reply || null,
      });
    }
  }

  return repoGetReview(id, locale);
}

/* ── DELETE ── */
export async function repoDeleteReview(id: string) {
  await db.delete(reviews).where(eq(reviews.id, id));
  return true;
}

/* ── REACTION (helpful +1) ── */
export async function repoAddReaction(id: string, locale: string) {
  await db
    .update(reviews)
    .set({ helpful_count: sql`helpful_count + 1` as any })
    .where(eq(reviews.id, id));
  return repoGetReview(id, locale);
}
