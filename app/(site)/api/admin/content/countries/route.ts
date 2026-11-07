
import { NextRequest, NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/drizzle";
import { countries } from "@/drizzle/schema";
import { requireAdmin, originIsValid } from "@/lib/cms/auth";

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const createCountrySchema = z.object({
  name: z.string().trim().min(1).max(200),
  slug: slugSchema,
  data: z.record(z.string(), z.unknown()),
});

const updateCountrySchema = z.object({
  slug: slugSchema,
  version: z.number().int().positive(),
  name: z.string().trim().min(1).max(200).optional(),
  data: z.record(z.string(), z.unknown()).refine(
    (data) => Object.keys(data).length > 0,
    "At least one field is required."
  ),
});

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
}

// GET: Fetch all countries
export async function GET() {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return errorResponse("Unauthorized", 401);
    }

    const result = await db
      .select()
      .from(countries)
      .orderBy(countries.name);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("GET countries error:", error);

    return errorResponse(
      "Failed to fetch countries",
      500
    );
  }
}

// POST: Create a new country
export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return errorResponse("Unauthorized", 401);
    }

    if (!originIsValid(req)) {
      return errorResponse("Invalid request origin", 403);
    }

    const body: unknown = await req.json();
    const parsed = createCountrySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { name, slug, data } = parsed.data;

    const [country] = await db
      .insert(countries)
      .values({
        name,
        slug,
        data: { ...data, name },
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: country,
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return errorResponse(
        "Country with this slug already exists",
        409
      );
    }

    console.error("POST countries error:", error);

    return errorResponse(
      "Failed to create country",
      500
    );
  }
}

// PATCH: Update country content
export async function PATCH(req: NextRequest) {
  try {
    // const admin = await requireAdmin();

    // if (!admin) {
    //   return errorResponse("Unauthorized", 401);
    // }

    // if (!originIsValid(req)) {
    //   return errorResponse("Invalid request origin", 403);
    // }

    const body: unknown = await req.json();
    const parsed = updateCountrySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { slug, version, name, data } = parsed.data;

    const [updatedCountry] = await db
      .update(countries)
      .set({
        ...(name ? { name } : {}),

        // Merge supplied fields into existing JSONB.
        data: sql`
          ${countries.data} ||
          ${JSON.stringify({
            ...data,
            ...(name ? { name } : {}),
          })}::jsonb
        `,

        version: sql`${countries.version} + 1`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(countries.slug, slug),
          eq(countries.version, version)
        )
      )
      .returning();

    if (!updatedCountry) {
      const [existing] = await db
        .select({
          version: countries.version,
        })
        .from(countries)
        .where(eq(countries.slug, slug))
        .limit(1);

      if (!existing) {
        return errorResponse("Country not found", 404);
      }

      return NextResponse.json(
        {
          success: false,
          message: "Content has changed. Please reload.",
          currentVersion: existing.version,
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedCountry,
    });
  } catch (error) {
    console.error("PATCH countries error:", error);

    return errorResponse(
      "Failed to update country",
      500
    );
  }
}
