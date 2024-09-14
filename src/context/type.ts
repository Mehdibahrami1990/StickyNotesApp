export type contextDataProps = {
  selectedNote?: string | null;
  setSelectedNote: (selectedNote: string | null) => void;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
  notes: any;
  setNotes: (notes: any) => void;
};
