export const generateSlug = (name: string): string => {
    const slugBase = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const uniqueIdentifier = Date.now().toString().slice(-8); // Use the last 8 digits of the current timestamp
    return `${slugBase}-${uniqueIdentifier}`;
};
