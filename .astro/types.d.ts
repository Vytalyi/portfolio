declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"case_studies": {
"ab-testing-at-maxymiser.md": {
	id: "ab-testing-at-maxymiser.md";
  slug: "ab-testing-at-maxymiser";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"budgeting-apps-at-logicnucleo.md": {
	id: "budgeting-apps-at-logicnucleo.md";
  slug: "budgeting-apps-at-logicnucleo";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"cloudpages-for-exacttarget.md": {
	id: "cloudpages-for-exacttarget.md";
  slug: "cloudpages-for-exacttarget";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"community-for-qvc.md": {
	id: "community-for-qvc.md";
  slug: "community-for-qvc";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"corporate-plattform-for-pearson.md": {
	id: "corporate-plattform-for-pearson.md";
  slug: "corporate-plattform-for-pearson";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"docx-reporter-for-logicnucleo.md": {
	id: "docx-reporter-for-logicnucleo.md";
  slug: "docx-reporter-for-logicnucleo";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"enterprise-store-for-blackberry.md": {
	id: "enterprise-store-for-blackberry.md";
  slug: "enterprise-store-for-blackberry";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"i18n-for-exacttarget.md": {
	id: "i18n-for-exacttarget.md";
  slug: "i18n-for-exacttarget";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"medical-aggregator-for-gl.md": {
	id: "medical-aggregator-for-gl.md";
  slug: "medical-aggregator-for-gl";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"modeling-tool-for-newera.md": {
	id: "modeling-tool-for-newera.md";
  slug: "modeling-tool-for-newera";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"mogration-for-general-electrics.md": {
	id: "mogration-for-general-electrics.md";
  slug: "mogration-for-general-electrics";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"online-editor-for-cf.md": {
	id: "online-editor-for-cf.md";
  slug: "online-editor-for-cf";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"report-analyzer-for-emp.md": {
	id: "report-analyzer-for-emp.md";
  slug: "report-analyzer-for-emp";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"responsive-migration-for-ticketmaster.md": {
	id: "responsive-migration-for-ticketmaster.md";
  slug: "responsive-migration-for-ticketmaster";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"stores-for-shop-direct.md": {
	id: "stores-for-shop-direct.md";
  slug: "stores-for-shop-direct";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"stores-for-travis-perkins.md": {
	id: "stores-for-travis-perkins.md";
  slug: "stores-for-travis-perkins";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
"website-and-hub-for-sh.md": {
	id: "website-and-hub-for-sh.md";
  slug: "website-and-hub-for-sh";
  body: string;
  collection: "case_studies";
  data: InferEntrySchema<"case_studies">
} & { render(): Render[".md"] };
};
"experience": {
"epam.md": {
	id: "epam.md";
  slug: "epam";
  body: string;
  collection: "experience";
  data: InferEntrySchema<"experience">
} & { render(): Render[".md"] };
"globallogic.md": {
	id: "globallogic.md";
  slug: "globallogic";
  body: string;
  collection: "experience";
  data: InferEntrySchema<"experience">
} & { render(): Render[".md"] };
"logicnucleo.md": {
	id: "logicnucleo.md";
  slug: "logicnucleo";
  body: string;
  collection: "experience";
  data: InferEntrySchema<"experience">
} & { render(): Render[".md"] };
"maxymiser.md": {
	id: "maxymiser.md";
  slug: "maxymiser";
  body: string;
  collection: "experience";
  data: InferEntrySchema<"experience">
} & { render(): Render[".md"] };
"waverley.md": {
	id: "waverley.md";
  slug: "waverley";
  body: string;
  collection: "experience";
  data: InferEntrySchema<"experience">
} & { render(): Render[".md"] };
};
"skills": {
"be.md": {
	id: "be.md";
  slug: "be";
  body: string;
  collection: "skills";
  data: InferEntrySchema<"skills">
} & { render(): Render[".md"] };
"build.md": {
	id: "build.md";
  slug: "build";
  body: string;
  collection: "skills";
  data: InferEntrySchema<"skills">
} & { render(): Render[".md"] };
"crm.md": {
	id: "crm.md";
  slug: "crm";
  body: string;
  collection: "skills";
  data: InferEntrySchema<"skills">
} & { render(): Render[".md"] };
"fe.md": {
	id: "fe.md";
  slug: "fe";
  body: string;
  collection: "skills";
  data: InferEntrySchema<"skills">
} & { render(): Render[".md"] };
"markup.md": {
	id: "markup.md";
  slug: "markup";
  body: string;
  collection: "skills";
  data: InferEntrySchema<"skills">
} & { render(): Render[".md"] };
"other.md": {
	id: "other.md";
  slug: "other";
  body: string;
  collection: "skills";
  data: InferEntrySchema<"skills">
} & { render(): Render[".md"] };
};
"social_links": {
"facebook.md": {
	id: "facebook.md";
  slug: "facebook";
  body: string;
  collection: "social_links";
  data: InferEntrySchema<"social_links">
} & { render(): Render[".md"] };
"github.md": {
	id: "github.md";
  slug: "github";
  body: string;
  collection: "social_links";
  data: InferEntrySchema<"social_links">
} & { render(): Render[".md"] };
"linkedin.md": {
	id: "linkedin.md";
  slug: "linkedin";
  body: string;
  collection: "social_links";
  data: InferEntrySchema<"social_links">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
