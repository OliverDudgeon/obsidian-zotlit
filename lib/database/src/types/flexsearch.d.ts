declare module "flexsearch" {
  export interface DocumentSearchOptions<T extends boolean = boolean> {
    query?: string;
    limit?: number;
    suggest?: boolean;
    enrich?: T;
    where?: Record<string, unknown>;
    page?: boolean | number;
    offset?: number;
    index?: string | string[];
  }

  export interface SimpleDocumentSearchResultSetUnit {
    id: number | string;
    doc?: unknown;
    score?: number;
  }
}
