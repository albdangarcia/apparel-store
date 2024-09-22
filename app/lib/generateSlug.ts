/**
 * Generates a URL-friendly slug for a product.
 * The slug is created by converting the product name to lowercase,
 * replacing non-alphanumeric characters with hyphens, and appending
 * a unique identifier based on the current timestamp.
 *
 * @param {string} name - The name of the product.
 * @returns {string} - The generated slug.
 */
export const generateSlug = (name: string): string => {
    const slugBase = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const uniqueIdentifier = Date.now().toString().slice(-8); // Use the last 8 digits of the current timestamp
    return `${slugBase}-${uniqueIdentifier}`;
};
