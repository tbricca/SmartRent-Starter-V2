# Prevent Design System Runtime Errors

## Purpose
Prevent runtime errors from incorrect usage of design system components, including invalid icon imports and incorrect prop types.

## Rules

### Rule 1: Icon Imports

**ALWAYS verify icon names against the design system documentation before importing from `@smartrent/icons`.**

### Rule 2: Typography Color Props

**ALWAYS use string color names, NOT theme object values, for the Typography `color` prop.**

**Common mistakes:**
- ❌ `<Typography color={colors.primary}>` → ✅ `<Typography color="primary">`
- ❌ `<Typography color={colors.textSecondary}>` → ✅ `<Typography color="textSubtitle">`
- ❌ `<Typography color={useTheme().colors.error}>` → ✅ `<Typography color="error">`

**Valid color values** (from theme):
- Semantic: `"primary"`, `"error"`, `"success"`, `"warning"`
- Text: `"textTitle"`, `"textSubtitle"`, `"textDisabled"`, `"link"`
- Component: Check design-system-docs/Typography.mdx for all options

### Rule 3: Typography Variation Props

**ALWAYS use the full dot-notation format for Typography `variation` prop, NOT HTML heading shortcuts.**

**Common mistakes:**
- ❌ `<Typography variation="h1">` → ✅ `<Typography variation="semibold.title.one">`
- ❌ `<Typography variation="h3">` → ✅ `<Typography variation="semibold.title.three">`
- ❌ `<Typography variation="h6">` → ✅ `<Typography variation="semibold.title.six">`

**Valid variation format**: `{weight}.{style}.{size}`

Examples:
- Titles: `"semibold.title.one"` through `"semibold.title.six"`
- Body: `"regular.body.small"`, `"regular.body.medium"`, `"regular.body.large"`
- Caption: `"regular.caption.small"`, `"semibold.caption.medium"`, etc.
- Full list: Check design-system-docs/Typography.mdx

**Note**: When using a variation like `"semibold.title.six"`, you don't need to also specify `weight="semibold"` - the variation already includes the weight.

### Rule 4: Page Scrolling

**ALWAYS use ScrollView for page containers that need scrolling, NOT View.**

**Common mistakes:**
- ❌ `<View style={styles.container}>` for full page content → ✅ `<ScrollView style={styles.container}>`
- ❌ Using `View` as the root page wrapper → ✅ Use `ScrollView` for scrollable pages

**When to use ScrollView:**
- Full-page layouts with content that extends beyond viewport
- Forms with multiple sections
- Any page where content might overflow

**Implementation pattern:**
```tsx
// ❌ WRONG - Content won't scroll
<View style={styles.container}>
  <View style={styles.content}>
    {/* Long content */}
  </View>
</View>

// ✅ CORRECT - Content scrolls
<ScrollView style={styles.container}>
  <View style={styles.content}>
    {/* Long content */}
  </View>
</ScrollView>
```

### Required Steps

1. **Before using any icon**, check `design-system-docs/icons.mdx` for the correct export name
2. **Never guess icon names** - icon names do not always follow predictable patterns
3. **Common mistakes to avoid**:
   - ❌ `TrashIcon` → ✅ `Trash`
   - ❌ `InfoIcon` → ✅ `Information`
   - ❌ `InfoCircleIcon` → ✅ `Information`
   - ❌ `Info` → ✅ `Information`
   - ❌ `DeleteIcon` → ✅ `Trash` or `TrashX`
   - ❌ `InformationIcon` → ✅ `Information`

### How to Find the Correct Icon Name

**Method 1: Check the actual package (RECOMMENDED)**

Use bash to list actual icon files in the package:
```bash
ls node_modules/@smartrent/icons/dist/ | grep -i "search_term" | grep "\.js$" | sed 's/\.js$//'
```

Example:
```bash
# Find info-related icons
ls node_modules/@smartrent/icons/dist/ | grep -i "info" | grep "\.js$" | sed 's/\.js$//'
# Returns: Information.js, InformationBold.js, InformationSolid.js, etc.
```

**Method 2: Use the Agent tool**
```
Use Agent(explorer) to search design-system-docs for icon names containing "trash"
```

**Method 3: Read documentation**
1. Read `design-system-docs/icons.mdx` to find the available icons list
2. Search for the icon concept you need (e.g., "trash", "delete", "info")
3. Use the exact export name from the documentation

**Common icon naming patterns:**
- Base icon: `IconName` (e.g., `Trash`, `Information`)
- Bold variant: `IconNameBold` (e.g., `TrashBold`, `InformationBold`)
- Solid variant: `IconNameSolid` (e.g., `TrashSolid`, `InformationSolid`)
- Solid Bold variant: `IconNameSolidBold` (e.g., `InformationSolidBold`)

### Implementation Pattern

```tsx
// ❌ WRONG - Guessing icon names
import { TrashIcon, DeleteIcon } from "@smartrent/icons";

// ✅ CORRECT - Using documented icon names
import { Trash, InfoCircle } from "@smartrent/icons";
```

### When Adding New Icons

1. First, use the Agent(explorer) tool to search for available icon names:
   ```
   Search design-system-docs/icons.mdx for icon names containing "trash" or "delete"
   ```
2. Confirm the exact export name from the search results
3. Import and use the confirmed name

### Error Prevention Checklist

Before committing code that uses icons:
- [ ] Icon name was verified against `design-system-docs/icons.mdx`
- [ ] No compilation warnings about missing exports
- [ ] Icons render correctly in the UI
- [ ] TypeScript/ESLint shows no import errors

### Rule 5: Component API Verification

**ALWAYS read `design-system-docs/[componentname].mdx` BEFORE using any component from `@smartrent/*` packages.**

This is the MOST CRITICAL rule. Failure to follow this rule results in:
- Incorrect prop names (e.g., `label` instead of `title`)
- Wrong package imports (e.g., importing `Tabs` from `@smartrent/ui` instead of `@smartrent/shared-ui`)
- Missing required props
- Invalid prop values
- Component misuse and runtime errors

### Required Component Usage Workflow

**BEFORE using ANY component, complete these steps IN ORDER:**

#### Step 1: Read the Documentation File
- Location: `design-system-docs/[ComponentName].mdx` (exact component name, case-sensitive)
- If the component doesn't have an MDX file, search `design-system-docs/AGENTS.md` for the component list
- Read the ENTIRE "API" section and "Usage Examples" section
- **DO NOT PROCEED until you have read the documentation**

#### Step 2: Verify Import Location
- Check the "Installation" or first code example in the MDX file
- Confirm which package exports the component (e.g., `@smartrent/ui`, `@smartrent/shared-ui`, `@smartrent/forms`)
- **Components may be in DIFFERENT packages than you expect**

**Common import mistakes:**
- ❌ `import { Tabs, Tab } from "@smartrent/ui"` → ✅ `import { Tabs, Tab } from "@smartrent/shared-ui"`
- ❌ `import { InputStepper } from "@smartrent/ui"` → ✅ `import { InputStepper } from "@smartrent/shared-ui"`
- ❌ `import { Banner } from "@smartrent/ui"` → ✅ `import { Banner, BannerIcon } from "@smartrent/shared-ui"`

#### Step 3: Extract Exact Prop Names
- Copy the prop names EXACTLY from the "API" section or TypeScript interface
- **Do NOT translate HTML-style props** (e.g., `label` on Tab does not exist - it's `title`)
- **Do NOT guess variations** (e.g., `variation` vs `color`, `onChange` vs `onPress`)
- If unsure about a prop, verify in the usage examples

**Common prop name mistakes:**
- ❌ `<Tab label="Invoice" />` → ✅ `<Tab title="Invoice" />`
- ❌ `<Tabs value={active} onChange={setActive}>` → ✅ Individual tabs have `active` prop and `onPress` callback
- ❌ `<Button iconLeft={TrashIcon} />` → ✅ `<Button iconLeft={Trash} />` (also verify icon name)
- ❌ `<SelectField iconLeft={CreditCard} />` → ✅ `<SelectField StartAdornment={CreditCard} />`

#### Step 4: Verify Against Usage Examples
- Find at least ONE usage example in the MDX file that matches your use case
- Copy the pattern EXACTLY, then modify data/content only
- If no matching example exists, find the closest one and adapt carefully

#### Step 5: Check for Related Components
- Some components require specific children (e.g., Tabs requires Tab children with specific props)
- Some components have helper components (e.g., Banner has BannerIcon, BannerActions)
- Read the "Component Interdependencies" section if available

### PROHIBITED Actions

**NEVER do these:**
- ❌ Guess prop names based on HTML or other frameworks (no `label`, `className`, `onClick` unless documented)
- ❌ Assume a component is in `@smartrent/ui` without checking
- ❌ Use a component without reading its MDX file first
- ❌ Build custom implementations before checking if a component exists (e.g., custom quantity controls when InputStepper exists)
- ❌ Combine props from multiple components (e.g., using Tab props on Tabs)
- ❌ Use property dot-notation (e.g., `variation="h3"`) without verifying the exact allowed values

### Verification Checklist

Before submitting code with design system components, verify:
- [ ] I read `design-system-docs/[ComponentName].mdx` for EACH component used
- [ ] All import statements match the documentation examples
- [ ] All prop names match EXACTLY (case-sensitive)
- [ ] All prop values are from documented options (for enums/unions)
- [ ] I copied patterns from usage examples, not from memory or assumptions
- [ ] I checked for related/helper components needed

### Common Component Usage Mistakes

**Tabs Component:**
```tsx
// ❌ WRONG - Using HTML-style API
<Tabs value={activeTab} onChange={setActiveTab}>
  <Tab label="Invoice" />
  <Tab label="Device order" />
</Tabs>

// ✅ CORRECT - Using actual API from documentation
<Tabs>
  <Tab
    title="Invoice"
    active={activeTab === 'invoice'}
    onPress={() => setActiveTab('invoice')}
  />
  <Tab
    title="Device order"
    active={activeTab === 'device-order'}
    onPress={() => setActiveTab('device-order')}
  />
</Tabs>
```

**InputStepper Component:**
```tsx
// ❌ WRONG - Building custom quantity controls
<HStack style={{ borderWidth: 1 }}>
  <IconButton icon={Minus} onPress={decrement} />
  <Typography>{quantity}</Typography>
  <IconButton icon={Plus} onPress={increment} />
</HStack>

// ✅ CORRECT - Using InputStepper from design system
<InputStepper
  value={quantity}
  onChangeValue={setQuantity}
  minValue={0}
/>
```

**SelectField Component:**
```tsx
// ❌ WRONG - Using incorrect adornment prop
<SelectField
  iconLeft={CreditCard}
  options={paymentMethods}
/>

// ✅ CORRECT - Using documented StartAdornment prop
<SelectField
  StartAdornment={CreditCard}
  options={paymentMethods}
/>
```

### Rule 6: Match Screenshot Colors Exactly

**When implementing a design from a screenshot, match the exact background and surface colors shown — do NOT substitute theme tokens that may differ.**

Theme tokens like `colors.pageBackground` may resolve to a gray value, not white. If the screenshot clearly shows a white background, use `"#FFFFFF"` explicitly.

**Guidelines:**
- If a screenshot shows a white background, use `"#FFFFFF"` explicitly
- Only use theme color tokens when no screenshot reference exists or when the screenshot clearly uses the themed gray background
- When in doubt, compare the theme token's actual rendered color against the screenshot before using it
- This applies to all surface colors, not just page backgrounds — cards, sections, modals, etc.

**Common mistakes:**
- ❌ `backgroundColor: colors.pageBackground` when screenshot shows white → ✅ `backgroundColor: "#FFFFFF"`
- ❌ Assuming theme tokens match the design without verifying → ✅ Compare token output against the screenshot

## Rationale

Icon import errors cause runtime failures that break the UI. These errors are:
- **Easy to prevent**: Always check the documentation first
- **Hard to debug**: Icons may render as nothing or cause crashes
- **User-facing**: Broken icons directly impact the user experience

Component API errors cause runtime failures and incorrect UI behavior:
- **Easy to prevent**: Always read documentation before using components
- **Hard to debug**: Wrong props may fail silently or cause cryptic errors
- **Time-consuming**: Fixing errors after implementation takes much longer than reading docs first
- **User-facing**: Incorrect component usage directly impacts user experience

By following these rules, we ensure all imports and component usage are valid before code is written.
