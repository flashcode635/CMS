# HeadingOfCard Component Documentation

## Overview

`HeadingOfCard` is a reusable React component designed for the **SPH (Study/MBBS in Abroad)** website. It renders a gradient-styled heading that supports **mixed typography** — combining normal-weight and bold-italic text on the same line, matching the brand's visual identity.

---

## 📦 Import

```tsx
import HeadingOfCard from "@/components/HeadingOfCard";
```

---

## 🧩 Props

| Prop          | Type              | Required | Default  | Description                                                                 |
|---------------|-------------------|----------|----------|-----------------------------------------------------------------------------|
| `title`       | `string`          | ✅ Yes   | —        | The main heading text (renders with bold gradient).                         |
| `type`        | `"bold" \| "normal"` | ✅ Yes | `"bold"` | Controls whether the heading renders in bold or normal weight.              |
| `prefix`      | `string`          | ❌ No    | —        | Normal-weight text displayed **before** the gradient title on the same line.|
| `italic`      | `boolean`         | ❌ No    | `false`  | Applies italic styling to the heading text.                                 |
| `description` | `JSX.Element`     | ❌ No    | —        | Optional body copy rendered below the heading.                              |

---

## 🎨 Styling Details

- **Font Family:** `Poppins, sans-serif`
- **Gradient:** `linear-gradient(169deg, #00923F 12.704%, #3163FF 87.17%)`
  - Starts with brand green (`#00923F`)
  - Ends with brand blue (`#3163FF`)
- **Text Sizes:**
  - Mobile: `text-4xl`
  - Desktop (lg+): `text-[50px]`
- **Line Height:**
  - Mobile: `leading-tight`
  - Desktop: `leading-[1.2]`

---

##  Usage Examples

### 1. Mixed Style — Normal Prefix + Bold Italic Gradient Title

Matches **Image 1**: *"Top Countries for Study/MBBS in Abroad"*

```tsx
<HeadingOfCard
  prefix="Top Countries for "
  title="Study/MBBS in Abroad"
  italic={true}
  type="bold"
/>
```

**Output:**
> Top Countries for **_Study/MBBS in Abroad_**
>
> *(Normal weight) + (Bold Italic Gradient)*

---

### 2. Fully Bold Gradient Heading

Matches **Image 2**: *"Know More About Us"*

```tsx
<HeadingOfCard
  title="Know More About Us"
  type="bold"
/>
```

**Output:**
> **Know More About Us**
>
> *(Bold Gradient)*

---

### 3. Normal Weight Heading

```tsx
<HeadingOfCard
  title="Our Mission & Vision"
  type="normal"
/>
```

---

### 4. With Description (Body Copy)

```tsx
<HeadingOfCard
  prefix="Explore "
  title="Top Universities Worldwide"
  italic={true}
  type="bold"
  description={
    <p className="text-gray-600 text-lg mt-4">
      Discover the best institutions across the globe for your medical journey.
    </p>
  }
/>
```

---

## 🧠 How It Works

The component renders a **single `<h2>` element** with the gradient applied via `bg-clip-text`. Inside it, two `<span>` elements handle the mixed typography:

1. **`prefix` span** → `font-normal` (lighter weight)
2. **`title` span** → `font-bold` (heavier weight)

Both spans share the same gradient background from the parent `<h2>`, creating a cohesive visual while allowing weight contrast.

```
┌─────────────────────────────────────────────┐
│  <h2> (gradient applied here)               │
│    ├─ <span> prefix  → font-normal          │
│    └─ <span> title   → font-bold [+italic]  │
└─────────────────────────────────────────────┘
```

---

##  File Structure

```
src/
└── components/
    └── HeadingOfCard.tsx
```

---

## ⚠️ Notes & Best Practices

- ✅ Always provide the `type` prop — it has no default in the type definition (though runtime defaults to `"bold"`).
- ✅ Use `prefix` only when you need mixed-weight text on the **same line**.
- ✅ The `description` prop accepts any valid JSX — paragraphs, links, buttons, etc.
- ⚠️ The gradient is applied to the **entire heading**, so both `prefix` and `title` share the same color transition.
- ⚠️ Ensure `Poppins` font is loaded in your app (via `next/font` or `<link>` in `layout.tsx`).

---

##  Testing Checklist

- [ ] Renders correctly on mobile (`text-4xl`)
- [ ] Renders correctly on desktop (`text-[50px]`)
- [ ] Gradient colors match brand guidelines
- [ ] Italic toggle works for both prefix and title
- [ ] Description renders below heading with proper spacing
- [ ] Works with and without `prefix` prop