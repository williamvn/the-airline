export const removeAllListener = (listeners) => {
    listeners.forEach(l => {
        l.removeAllListeners();
    });
}