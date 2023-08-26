export function truncate(input, maxLength = 150) {
    return input.length > maxLength ? `${input.substring(0, maxLength)}…` : input
}
