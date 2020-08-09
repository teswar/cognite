export function appendStyle(...classNames) {
    return classNames.filter(m => !!m).join(' ');
}