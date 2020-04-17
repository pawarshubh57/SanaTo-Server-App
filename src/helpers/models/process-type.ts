/**
 * This enum is used to check process type.
 * Instead of using number format, it's better to use enum.
 *
 * @enum {number}
 */
export enum ProcessType {
    numericOnly = 1,
    dateOnly,
    dateTime,
    dateAndTime
};