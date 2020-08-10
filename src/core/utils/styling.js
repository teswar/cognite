
/**
 * Joins strings ignoring empty/null/undefined. Used for appending style-classnames ....
 * @param  {...any} classNames 
 */
export function appendStyle(...classNames) {
    return classNames.filter(m => !!m).join(' ');
}