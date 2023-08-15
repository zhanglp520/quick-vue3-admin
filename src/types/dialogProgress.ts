export interface IDialogProgress {
    prev: () => void;
    next: () => void;
    save: (callback: any) => void;
}
