/**
 * Function to normalize file paths by replacing backslashes with slashes
 * and removing the 'public/' prefix if it exists.
 *
 * @param filePath - The original file path
 * @returns The normalized file path
 */
export const normalizeFilePath = (filePath: string): string => {
    return filePath.replace(/\\/g, '/').replace(/^public\//, '');
};
