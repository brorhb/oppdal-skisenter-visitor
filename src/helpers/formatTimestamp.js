export const formatTimestamp = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleDateString();
}