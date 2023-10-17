////////////////////////////////////////////////////////////////////////////////
export const urlifyPath = (path: string): string => {
    if(!path) return '';
    path = encodeURIComponent(path);
    return `/${path}`;
};
